import React, { useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left section */}
      <div
        className="w-full md:w-1/2 relative flex items-center justify-center bg-cover bg-center min-h-[300px] md:min-h-screen"
        style={{ backgroundImage: `url(${restaurant})` }}
      >
        {/* Black Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-80"
        ></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-5 md:bottom-10 px-6 md:px-8 text-lg md:text-2xl italic text-white z-10 text-center md:text-left">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-2 md:mt-4 text-yellow-400">
            - Founder of Restro
          </span>
        </blockquote>
      </div>

      {/* Right section */}
      <div className="w-full md:w-1/2 min-h-screen bg-[#1a1a1a] p-6 md:p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-12 md:h-14 md:w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl text-center mt-6 md:mt-10 font-semibold text-yellow-400 mb-6 md:mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Components */}
        {isRegister ? <Register  setIsRegister={setIsRegister}/> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm md:text-md text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <a
              onClick={() => setIsRegister(!isRegister)}
              href="#"
              className="text-yellow-400 font-semibold hover:underline ml-1"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
