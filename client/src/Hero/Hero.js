import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import homerootBanner from "../assets/homerootBanner.jpg";
import { ArrowForward } from "@mui/icons-material";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("book-auth") && localStorage.getItem("book-bug")){
      navigate("/dash");
    }
  }, []);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section className="hero relative mb-0">
      <div className="mt-8 pb-10">
        <img
          className="mt-8 md:max-h-[705px] w-full object-cover lg:max-h-[705px]"
          src={homerootBanner}
          alt="homerootBanner"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="container text-center mt-16">
          <h2 className="hidden md:text-6xl lg:text-7xl text-slate-300 font-light mb-4 md:block lg:block text-5xl">
            Buy Books Online
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Get best books tailored for you.
          </p>
          <button
            onClick={handleGetStarted}
            className="p-3 px-5 md:p-4 md:px-6 bg-transparent border-x-4 border-y-2 border-white text-white rounded-s-3xl rounded-e-3xl  text-base md:text-lg lg:text-xl"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
