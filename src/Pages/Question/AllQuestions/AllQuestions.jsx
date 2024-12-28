import React, { useEffect, useState } from "react";
// Importing necessary React hooks: useEffect for lifecycle management and useState for state management.

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Importing an icon from Material-UI for potential use in the UI, though it’s not currently used in this code.

import { FaUserAlt } from "react-icons/fa";
// Importing a user avatar icon from the React Icons library to represent user profiles visually.

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// Importing another Material-UI icon (not used in this code) for navigation indication.

import { MdNavigateNext } from "react-icons/md";
import axios from "../../../utility/axios";
import { Link, useNavigate } from "react-router-dom";
// Importing `Link` for navigation between routes and `useNavigate` for programmatic navigation.

import classes from "./AllQuestions.module.css";
// Importing CSS module for styling the component.

function AllQuestions() {
  // Defining a functional component named `AllQuestions`.

  const [questions, setQuestions] = useState([]);
  // Initializing `questions` state to hold the list of questions fetched from the API.

  const [loading, setLoading] = useState(true);
  // State to manage the loading status while data is being fetched.

  const [error, setError] = useState(null);
  // State to manage any error messages encountered during the fetch process.

  const token = localStorage.getItem("token");
  // Retrieving the authentication token from localStorage to include in API requests.

  const navigate = useNavigate();
  // Using `useNavigate` to programmatically redirect the user if necessary.

  useEffect(() => {
    // `useEffect` is used here to fetch questions when the component mounts.

    const fetchQuestions = async () => {
      // Defining an asynchronous function to fetch questions.

      try {
        const response = await axios({
          // Making a GET request to the `/question` endpoint.

          url: `/question`, // API endpoint for fetching all questions.
          headers: {
            Authorization: `Bearer ${token}`
            // Including the token in the Authorization header for secure access.
          }
        });

        console.log(response);
        // Logging the API response for debugging purposes.

        setQuestions(response?.data?.questions);
        // Updating the state with the list of questions retrieved from the API.

        setLoading(false);
        // Setting the loading state to false as the data fetching is complete.
      } catch (error) {
        console.error(error);
        // Logging the error to the console for debugging.

        setError("Failed to fetch questions.");
        // Updating the `error` state with a user-friendly message.

        setLoading(false);
        // Setting the loading state to false since the process has concluded (even if unsuccessful).
      }
    };

    fetchQuestions();
    // Calling the function to fetch questions upon component mount.
  }, [token, navigate]);
  // Adding `token` and `navigate` as dependencies to re-run the effect if they change.

  if (loading) {
    return <div>Loading...</div>;
    // Displaying a placeholder message or spinner while data is being fetched.
  }

  if (error) {
    return <div>{error}</div>;
    // Displaying an error message if there was a problem fetching the questions.
  }

  return (
    <>
      {questions?.map((question) => (
        // Iterating over the list of questions using `map`.

        <Link
          to={`/question/${question.question_id}`}
          // Wrapping each question in a `Link` to navigate to the question's detailed page.

          key={question.questionid}
          // Providing a unique key for each question to optimize rendering.

          style={{ textDecoration: "none", color: "black" }}
          // Styling the link to remove default underline and set text color.
        >
          <div className={classes.groupEach_Questions}>
            {/* Div to group each question visually. */}

            <div className={classes.each_Questions}>
              {/* Container for each individual question. */}

              <div className={classes.question}>
                {/* Section containing the user avatar and question title. */}

                <div className={classes.profile}>
                  <FaUserAlt />
                  {/* Icon to represent the user's avatar. */}
                </div>

                <div className={classes.question_title}>
                  {question.title}
                  {/* Displaying the title of the question. */}
                </div>
              </div>

              <MdNavigateNext
                style={{
                  fontSize: "24px", // Setting the size of the navigation arrow.
                  fontWeight: "bold", // Styling the arrow to appear bold.
                  marginRight: "20px", // Adding spacing to the right.
                  transition: "all 0.5s ease" // Adding a smooth transition effect.
                }}
              />
              {/* Adding a navigation arrow icon for visual enhancement. */}
            </div>

            <p>{question?.user_name}</p>
            {/* Displaying the name of the user who posted the question. */}
          </div>
        </Link>
      ))}
    </>
  );
}

export default AllQuestions;
// Exporting the component for use in other parts of the application.
