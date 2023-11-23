import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { showNotifications } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Notifications = () => {
  const { isStudent } = useSelector((state: RootState) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const { data, isLoading } = useQuery({
    queryFn: () => showNotifications(isStudent._id),
  });

  useEffect(() => {
    if (data) {
      setNotifications(data?.data || []);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(notifications) || notifications.length === 0) {
    console.log("no data");
    return <p>Data not available</p>;
  }

  console.log(data?.data, "notifications");
  return (
    <div className="flex justify-center items-center">
      {" "}
      <div className="bg-white border border-gray-300 p-4 mb-4 shadow-md rounded-md">
        {notifications.map((notify: { title: string; content: string }) => (
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
                  {notify.title}
                </h3>
              </div>
              <p className="text-gray-700 mt-2">{notify.content}</p>
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
        ))}
      </div>
    </div>
  );
};

export default Notifications;
