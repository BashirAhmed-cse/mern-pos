import React from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";

const Auth = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left section */}
      <div
        className="w-1/2 relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant})` }}
      >
        {/* Black Overlay (Using rgba for better opacity) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        ></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white z-10">
          "Serve customers the best food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-4 text-yellow-400">- Founder of Restro</span>
        </blockquote>
      </div>

      {/* Right section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
      <div className="flex flex-col items-center">
       <img src={logo} alt="logo" className="h-14 w-14 border-2 rounded-full p-1"/>
       <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Restro</h1>
      </div>
      </div>
    </div>
  );
};

export default Auth;
