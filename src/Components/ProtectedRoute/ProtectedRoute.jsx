import React from "react";
// Importing React library.

import { Navigate, redirect, useNavigate } from "react-router-dom";
// Importing routing utilities for navigation and redirection.

import { AppState } from "../../App";
// Importing application state context.

const ProtectedRoute = (children, msg, redirect) => {
  // Defining the ProtectedRoute functional component for route guarding.

  const token = localStorage.getItem("token");
  // Retrieving the authentication token from local storage.

  const navigate = useNavigate();
  // Using the `useNavigate` hook for programmatic navigation.

  const { user, setUser } = useContext(AppState);
  // Using context to access user information and state management functions.

  if (!token) {
    // Checking if the user is not authenticated (no token found).
    return <Navigate to="/login" state={{ msg, redirect }} />;
    // Redirecting to the login page with an optional state message and redirect URL.
  }

  return children;
  // Rendering the child components if the user is authenticated.
};

export default ProtectedRoute;
// Exporting the ProtectedRoute component for use in guarded routes.

