import React from "react";

const ListQuestions = () => {
  const truncatedQuestion = "How to use React Hooks?";
  const isAnswered = true;
  const date = "2023-11-25";

  return (
    <div className="flex w-full">
      <div className="w-2/3">
        <h1>My Questions</h1>
        <li className="w-full flex items-center justify-between border-b border-gray-300 p-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{truncatedQuestion}</h3>
          </div>

          <div className="flex-shrink-0 ml-4">
            {isAnswered ? (
              <span className="text-green-500 font-semibold">Answered</span>
            ) : (
              <span className="text-red-500 font-semibold">Not Answered</span>
            )}
          </div>

          {/* Date Section */}
          <div className="flex-shrink-0 ml-4">
            <span className="text-gray-500">{date}</span>
          </div>
        </li>
      </div>
      <div>
        <button className="bg-gray-200 p-2 rounded-md">
          {" "}
          Post a new question
        </button>
      </div>
    </div>
  );
};

export default ListQuestions;
