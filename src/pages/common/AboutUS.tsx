import React from "react";
import Navbar from "../../components/common/navbar";

const AboutUS = () => {
  return (
    <div>
              <Navbar/>
          <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span className="text-indigo-600">AceLearn</span>
            </h2>
            <p className="text-gray-700">
            Welcome to AceLearn, where education meets innovation! At AceLearn, we believe in the transformative power of education and its ability to connect aspiring learners with dedicated tutors worldwide. Our platform serves as a bridge between passionate tutors and eager students, fostering a dynamic online learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
