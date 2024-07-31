import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navroot() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="pb-2">
      <div className="fixed z-50 top-0 left-0 w-full flex flex-col sm:flex-row justify-around bg-slate-100 pt-3 pb-3">
        <span className="block sm:inline mt-2 sm:mt-0 underline cursor-pointer text-purple-700 hover:text-purple-900">
          About
        </span>
        <span className="block sm:inline mt-2 sm:mt-0 underline cursor-pointer text-purple-700 hover:text-purple-900">
          Careers
        </span>
        <span
          onClick={handleSignup}
          className="block sm:inline mt-2 sm:mt-0 underline cursor-pointer text-purple-700 hover:text-purple-900"
        >
          Sign-up
        </span>
        <span
          onClick={handleLogin}
          className="block sm:inline mt-2 sm:mt-0 underline cursor-pointer text-purple-700 hover:text-purple-900"
        >
          Login
        </span>
      </div>
    </div>
  );
}

export default Navroot;
