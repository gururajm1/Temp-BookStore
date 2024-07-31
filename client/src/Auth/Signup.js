// Signup.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import pakka from "../assets/pakka.jpg";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../dependencies/firebaseConfig";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("book-auth") && localStorage.getItem("book-bug")) {
      navigate("/dash");
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        if (
          !localStorage.getItem("book-auth") ||
          !localStorage.getItem("book-bug")
        ) {
          localStorage.setItem("book-auth", "true");
          localStorage.setItem("book-bug", currentUser.email);
          navigate("/dash");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const userNameRef = useRef(null);
  const userAgeRef = useRef(null);
  const passwordInputRef = useRef(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://api.itbook.store/1.0/new");
      const data = await response.json();
      if (data.books) {
        return data.books;
      } else {
        throw new Error("Unexpected response format: No 'books' key");
      }
    } catch (e) {
      throw new Error(`Unexpected response format: ${e.message}`);
    }
  };

  const signUpForm = async (e) => {
    e.preventDefault();
    setError("");
    const email = emailInputRef.current.value;
    const name = userNameRef.current.value;
    const age = userAgeRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch books data
      const books = await fetchBooks();

      // Send data to backend
      await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        age,
        books,
      });

      // Store user data in local storage
      localStorage.setItem("book-auth", "true");
      localStorage.setItem("book-bug", email);
      navigate("/dash");
    } catch (err) {
      setError(err.message);
      console.error("Error during signup:", err); // Log error for debugging
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative md:h-[550px] hidden md:block">
          <img
            className="object-cover w-full h-full"
            src={pakka}
            alt="Signup background"
          />
        </div>
        <div className="p-6 md:p-7 md:pt-5 flex flex-col justify-center items-center md:items-start">
          <form onSubmit={signUpForm} className="w-full">
            <h2 className="text-4xl font-bold text-center mb-9 text-gray-600">
              Signup
            </h2>
            <div className="space-y-4 w-full md:w-auto">
              <input
                className="border p-2 w-full text-black"
                type="text"
                placeholder="Enter Your Name"
                ref={userNameRef}
              />
              <input
                className="border p-2 w-full text-black"
                type="number"
                placeholder="Enter Your Age"
                ref={userAgeRef}
              />
              <input
                className="border p-2 w-full text-black"
                type="email"
                placeholder="Your Email Address"
                ref={emailInputRef}
              />
              <input
                className="border p-2 w-full text-black"
                type="password"
                placeholder="Enter Password"
                ref={passwordInputRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <PasswordChecklist
                  value={password}
                  rules={[
                    "minLength",
                    "lowercase",
                    "specialChar",
                    "number",
                    "capital",
                  ]}
                  className="text-black"
                  minLength={8}
                />
              )}
              <h5 className="text-red-600">{error}</h5>
            </div>
            <button className="w-full bg-green-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 mt-4 rounded">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
