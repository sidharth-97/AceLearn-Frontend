import React, { useState } from "react";
import { useQuery } from "react-query";
import { viewMyQuestions } from "../../api/studentapi";

const ListQuestions = ({ toggleFunction }) => {
  const [index, setIndex] = useState(0);

  const { data } = useQuery({
    queryFn: () => viewMyQuestions(),
    queryKey: ["myQuestions"],
  });
  console.log(data?.data);

  return (
    <div className="flex w-full flex-col items-start w-full p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Homework Help</h1>

      <button
        onClick={(e) => toggleFunction(false)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Post a new question
      </button>
      <div className="flex w-full">
        {" "}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4">My Questions</h1>
          {data?.data.map((ques, index) => (
            <li
              onClick={(e) => setIndex(index)}
              key={index}
              className="w-full flex items-center justify-between border-b border-gray-300 p-4"
            >
              <div className="flex-shrink-0 ml-4">
                <div className="border border-gray-300 p-2 rounded text-center">
                  <span className="text-lg font-bold">
                    {new Date(ques.date).getDate()}
                  </span>
                  <div className="flex gap-1">
                    <span className="text-sm block">
                      {new Date(ques.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-sm block">
                      {new Date(ques.date).getFullYear().toString().substr(-2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 ms-2">
                <h3 className="font-bold text-lg">{ques.description}</h3>
              </div>

              <div className="flex-shrink-0 ml-4">
                {ques.tutor ? (
                  <span className="text-green-500 font-semibold">Answered</span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Not Answered
                  </span>
                )}
              </div>

              {/* Date Section */}
            </li>
          ))}
        </div>
        <div className="mt-4 w-1/2">
          <h1 className="text-2xl font-bold mb-2">Question</h1>
          <h3 className="text-lg font-semibold mb-2">
           Subject : {data?.data[index].subject}
          </h3>
          {}
          <p className="text-gray-700 mb-4">{data?.data[index].description}</p>

          <div>
            <h1 className="text-2xl font-bold mb-2">Solution</h1>
            {data?.data[index].solution && (
              <>
                <p className="text-gray-700 mb-2">
                  {data?.data[index].solution.text ?? ""}
                </p>
                {data?.data[index].solution.image && (
                  <img
                    src={data?.data[index].solution.image ?? ""}
                    alt="Solution Image"
                    className="mb-4 max-w-full"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListQuestions;
