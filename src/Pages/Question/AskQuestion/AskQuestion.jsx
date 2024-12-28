import { useRef } from "react";
// Importing `useRef` from React for managing references to DOM elements.

import Swal from "sweetalert2";
// Importing the SweetAlert2 library for displaying styled alert messages.

import classes from "./askQuestion.module.css";
// Importing the CSS module for styling the component.

import axiosBase from "../../../utility/axios.js";
// Importing a preconfigured Axios instance for making API requests.

import { useNavigate } from "react-router-dom";


function AskQuestion() {
  // Defining the functional component `AskQuestion`.

  const navigate = useNavigate();
  // Using `useNavigate` for navigation after posting a question.

  const titleDom = useRef();
  // Using `useRef` to get a reference to the title input field in the form.

  const descriptionDom = useRef();
  // Using `useRef` to get a reference to the description textarea in the form.

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");
  // Retrieving the authentication token from localStorage for secure API requests.

  async function handleSubmit(e) {
    // Defining an asynchronous function to handle form submission.
    e.preventDefault();
    // Preventing the default form submission behavior (page refresh).

    const title = titleDom.current.value;
    // Getting the current value of the title input field.

    const description = descriptionDom.current.value;
    // Getting the current value of the description textarea.

    try {
      // Wrapping the API call in a `try-catch` block to handle potential errors.

      // Make a POST request to your server to create a new question
      const response = await axiosBase.post(
        "/question",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Use the token from localStorage
          }
        }
      );

      if (response.status === 201) {
        // If the server responds with a 201 status, the question was created successfully.

        console.log("Question created successfully");
        // Logging a success message for debugging purposes.

        await Swal.fire({
          // Displaying a success alert using SweetAlert2.
          title: "Success!",
          text: "Question created successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });

        navigate("/home");
        // Redirecting the user to the home page after a successful post.
      } else {
        // Handling unexpected status codes.
        console.error("Failed to create question");

        await Swal.fire({
          // Displaying an error alert using SweetAlert2.
          title: "Error",
          text: "Failed to create question",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      // Catching and handling errors from the API call.

      console.error(error);
      // Logging the error to the console for debugging purposes.

      await Swal.fire({
        // Displaying an error alert using SweetAlert2.
        title: "Error",
        text: "Failed to create question. Please try again later.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

	return (
	
			<div className={classes.allContainer}>
				<div className={classes.question__container}>
					<div className={classes.question__wrapper}>
						<div className={classes.questionContainer}>
							<h2 className={classes.questionTitle}>
								Steps To Write A Good Question.
							</h2>
							<div className={classes.questionList}>
								<ul className={classes.questionListUl}>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Summarize your
										problems in a one-line title.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Describe your
										problem in more detail.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Describe what you
										tried and what you expected to happen.
									</li>
									<li className={classes.questionItem}>
										<span className={classes.icon}>→</span> Review your question
										and post it here.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<h4 className={classes.highlight}>Post Your Question</h4>
					<div className={classes.question__header__titleTwo}>
						<form onSubmit={handleSubmit} className={classes.question__form}>
							<input
								className={classes.question__title2}
								ref={titleDom}
								type="text"
								placeholder="Question title"
								required
							/>
							<textarea
								rows={4}
								className={classes.question__description}
								ref={descriptionDom}
								placeholder="Question Detail ..."
								required
							/>
							<div className={classes.buttonContainer}>
								<button className={classes.question__button} type="submit">
									Post Question
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		
	);
}

export default AskQuestion;
// Exporting the `AskQuestion` component for use in other parts of the application.
