// Importing necessary modules and components
import { Route, Routes, useNavigate } from "react-router-dom";
import { React, useState, useEffect, createContext } from "react";
import Login from "./Components/Login/Login";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Answer from "./Pages/Answers/Answer";
import AskQuestion from "./Pages/Question/AskQuestion/AskQuestion";
import Signup from "./Components/SignUp/Signup";
import Header from "./Components/Header/Header";
import Landing from "./Pages/Landing/Landing";
import axiosBase from "./utility/axios";
import About from "./Components/About/About";

// Create a context for global state management
export const AppState = createContext();

function App() {
  // State to store user information
  const [user, setUser] = useState({});

  // Navigation hook for programmatic redirects
  const navigate = useNavigate();

  // Token to check user authentication status
  const token = localStorage.getItem("token");
  
  async function checkUser() {
    try {
      // Make an API call to validate the token and fetch user data
      const { data } = await axiosBase.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the request header
        }
      });
       setUser(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
      navigate("/"); // Redirect to the landing page on failure
    }
  }

  // Hook to check user on component mount
  useEffect(() => {
    checkUser();
  }, [token]);

  return (
    <>
      {/* Provide global state (user, setUser) to the application */}
      <AppState.Provider value={{ user, setUser }}>
        {/* Include the Header component */}
        <Header />
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/question/:question_id" element={<Answer />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<AskQuestion />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        {/* Include the Footer component */}
        <Footer />
      </AppState.Provider>
    </>
  );
}

export default App;
