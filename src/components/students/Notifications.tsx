import React from "react";

const Notifications = () => {
  return (
    <div className="flex justify-center items-center">
      {" "}
      <div className="bg-white border border-gray-300 p-4 mb-4 shadow-md rounded-md">
        <div className="flex items-center mt-2">
          <div>
            <div className="bg-yellow-300 p-4 rounded-full mr-4">
              {/* Wallet icon or any other wallet-related content */}
              💰
            </div>
          </div>
          <div className="flex flex-col items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-600">
                {"Amount credited to Wallet "}
              </h3>
            </div>
            <p className="text-gray-700 mt-2">
              {
                "Cancellation Amount of Rs.5000 has been credited to your account."
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(Date.now()).toLocaleDateString()}
            </p>{" "}
            <div className="border-b w-full py-2 "></div>
          </div>
          <div>
            {" "}
            <button className="ms-3 text-gray-500">&#10006;</button>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div>
            <div className="bg-yellow-300 p-4 rounded-full mr-4">
              {/* Wallet icon or any other wallet-related content */}
              💰
            </div>
          </div>
          <div className="flex flex-col items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-600">
                {"Amount credited to Wallet "}
              </h3>
            </div>
            <p className="text-gray-700 mt-2">
              {
                "Cancellation Amount of Rs.5000 has been credited to your account."
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(Date.now()).toLocaleDateString()}
            </p>{" "}
            <div className="border-b w-full py-2 "></div>
          </div>
          <div>
            {" "}
            <button className="ms-3 text-gray-500">&#10006;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;