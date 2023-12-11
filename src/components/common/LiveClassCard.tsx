import React from "react";

const LiveClassCard = ({ data }) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl transform duration-500 hover:scale-105 hover:shadow-xl">
      <div className="flex justify-between p-4 border-b border-gray-200">
        <div className="font-bold">{data.subject}</div>
        <div>{data.duration}</div>
      </div>
      <div className="flex p-4 justify-between">
        <div className="flex items-center">
          <div className="bg-gray-300 w-16 h-16 rounded-full flex-shrink-0 mr-4">
            {/* Add your image here */}
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{data.topic}</p>
            <p className="text-gray-500">{data.description}</p>
            <p className="text-gray-500">{data.tutor}</p>
            <p className="text-gray-500">
              Fee : {data.fee > 0 ? data.fee : "Free"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex align-middle justify-center items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
          Register
        </button>
      </div>
    </div>
  );
};

export default LiveClassCard;
