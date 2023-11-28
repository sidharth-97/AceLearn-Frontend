import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { viewQuestions } from "../../api/tutorapi";
import SolveQuestions from "./SolveQuestions";

const StudentQuestionsView = ({ toggler }) => {
  const [solve, setSolve] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const {
    data: Question,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => viewQuestions(),
    queryKey: ["questionView"],
  });

  useEffect(() => {
    let timer;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !solve) {
      // When the time is up, set the toggler to true
      toggler(true);
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount

  }, [timeLeft, solve, toggler]);

  console.log(Question, "response");

  return (
    <>
      <div className={`bg-gray-100 font-sans p-6 ${!solve && "w-full"}`}>
        <div className={`${!solve && "flex"} justify-between mb-4`}>
          <div className="flex items-center mb-4">
            <button
              onClick={(e) => toggler(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          </div>
          { (
            <h3 className="text-lg font-semibold">
              Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </h3>
          )}
        </div>

        <div className="mb-4 text-gray-700">
          {Question?.data.description}
          {Question?.data.image && <img src={Question?.data.image} alt="Question" />}
        </div>

        {!solve && (
          <div className="flex space-x-4">
            <button
              onClick={() => refetch()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Skip Question
            </button>
            <button
              onClick={(e) => setSolve(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Solving
            </button>
          </div>
        )}
      </div>
      {solve && <SolveQuestions question={Question?.data._id} />}
    </>
  );
};

export default StudentQuestionsView;