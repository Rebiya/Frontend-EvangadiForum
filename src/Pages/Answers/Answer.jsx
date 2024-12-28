import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utility/axios";
import styles from "./Answer.module.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { AppState } from "../../App";

function Answer() {
  const navigate = useNavigate();
  const { question_id } = useParams();
  const { user, setUser } = useContext(AppState);
  const [answers, setAnswers] = useState([]);
  const [sendAns, setsendAns] = useState("");
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [question, setQuestion] = useState(null);
  const token = localStorage.getItem("token");

  // Function to fetch single question details
  const fetchQuestion = async () => {
    try {
      const response = await api({
        url: `/question/${question_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestion(response?.data?.questions[0]);
    } catch (error) {
      setError1(error?.response?.data?.message);
    }
  };

  // Function to fetch all answers for the given question
  const allAnswers = async () => {
    try {
      const AnswerLists = await api.get(`/answer/${question_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const answerData = allAnswerList.data.answers;
      // console.log(answerData);
      setAnswers(answerData);
    } catch (error) {
      // console.log(error);
      setError2(error?.response?.data?.message);
    }
  };
  // Post a new answer to the selected single question
  const sendAnswers = async (e) => {
    e.preventDefault();
    if (!sendAns.trim()) {
      setError3("Answer field cannot be empty!");
      return;
    }
    try {
      const postAns = await api.post(
        `/answer`,
        { answer: sendAns, questionid: question_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setsendAns("");
      setError3("");
      allAnswers();
    } catch (error) {
      setError3(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    {
      allAnswers();
      fetchQuestion();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.username}>
          <h4>Question</h4>
          <div className={styles.user}>
            Username: <span>{user.username}</span>
          </div>
        </div>
        <div className={styles.arrow}>
          <span>
            <FaCircleArrowRight />
          </span>
          {question?.title}
        </div>
        <div className={styles.desc}>{question?.description}</div>
        <hr />
        <div className="communityAns">
          <h3 className={styles.community}>Answers from the Community</h3>
          <hr />
        </div>
        <div className={styles.AllAns}>
          {answers.length > 0 ? (
            // Map through answers and display each
            answers.map((answer) => (
              <div key={answer.answer_id}>
                <div className={styles.AnswerPg}>
                  <div className={styles.avatar}>
                    {<FaUserAlt className={styles.avatar_img} />}
                    <div>{answer.user_name}</div>
                  </div>
                  <div className={styles.content}>{answer.content}</div>
                </div>
              </div>
            ))
          ) : (
            <h4 className={styles.no_answer}>No answers yet!</h4>
          )}
        </div>
        <div className={styles.answer_form}>
          <h4 className={styles.urAns}>Your Answer</h4>
          {error3 && <span style={{ color: "red" }}>{error3}</span>}
          <form onSubmit={sendAnswers}>
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
              name="answer"
              value={sendAns}
              onChange={(e) => setsendAns(e.target.value)}
            ></textarea>
            <button type="submit" style={{ backgroundColor: "blue" }}>
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
