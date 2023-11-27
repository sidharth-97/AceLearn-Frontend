import React from "react";

const ListQuestions = ({toggleFunction}) => {
  const truncatedQuestion = "How to use React Hooks?";
  const isAnswered = true;
  const date = "2023-11-25";

  return (
    <div className="flex flex-col items-start w-full p-6">
      <button onClick={(e)=>toggleFunction(false)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Post a new question
      </button>
      <div className="flex">
        {" "}
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">My Questions</h1>
          <li className="w-full flex items-center justify-between border-b border-gray-300 p-4">
            <div className="flex-shrink-0 ml-4">
              <div className="border border-gray-300 p-2 rounded text-center">
                <span className="text-lg font-bold">
                  {new Date(date).getDate()}
                </span>
                <div className="flex gap-1">
                  <span className="text-sm block">
                    {new Date(date).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-sm block">
                    {new Date(date).getFullYear().toString().substr(-2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 ms-2">
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
          </li>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">Question</h1>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            suscipit, omnis, quidem iste, voluptatum cumque facilis consequuntur
            alias in rem optio recusandae est sequi libero cupiditate.
            Repellendus dolorem in quam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListQuestions;
