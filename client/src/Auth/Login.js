import React, { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import pakka from "../assets/pakka.jpg";
import { firebaseAuth } from "../dependencies/firebaseConfig";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("book-auth")) {
      navigate("/dash");
    }
  }, [navigate]);

  const [error, setError] = useState("");
  const [passwordInputRef, setPasswordInputRef] = useState("");
  const emailInputRef = useRef();

  const handlePasswordChange = (e) => {
    setPasswordInputRef(e.target.value);
  };

  const logInForm = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef;
    setError("");
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      localStorage.setItem("book-auth", "true");
      navigate("/dash");
    } catch (err) {
      setError(err.message);
      console.error("Login error: ", err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/dash");
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative md:h-[550px] hidden md:block">
          <img
            className="object-cover w-full h-full"
            src={pakka}
            alt="Login background"
          />
        </div>
        <div className="p-6 md:p-7 md:pt-5 flex flex-col justify-center">
          <form onSubmit={logInForm}>
            <h2 className="text-4xl font-bold text-center mb-9 text-gray-600">
              Login
            </h2>
            <div className="space-y-4">
              <input
                className="border p-2 w-full text-black"
                type="text"
                placeholder="Your Email Address"
                ref={emailInputRef}
              />
              <input
                className="border p-2 w-full text-black"
                type="password"
                placeholder="Enter Password"
                value={passwordInputRef}
                onChange={handlePasswordChange}
              />
              {passwordInputRef !== "" ? (
                <PasswordChecklist
                  value={passwordInputRef}
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
              ) : (
                ""
              )}
            </div>
            <button className="w-full bg-green-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 mt-4 rounded">
              Log In
            </button>
            <h5 className="text-red-600 text-center">{error}</h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
