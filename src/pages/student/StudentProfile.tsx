import React, { useCallback, useEffect, useState } from "react";
import avatar from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513fdf.jpg";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useMutation, useQuery } from "react-query";
import { getStudentSchedule, studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "../../api/tutorapi";

const StudentProfile = () => {

  const { isStudent } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryFn:()=>studentDetails(isStudent._id)
  })
  console.log(data?.data)
  
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />

        <div className="p-5 lg:p-14 xl:p-16 bg-9ED0F5 w-full">
          {/* <div className="flex bg-white justify-center items-center p-5"> */}{" "}
          {/* Reduced padding */}
          {/* <div>
            <h2 className="font-semibold text-2xl">Welcome Sidharth,</h2>
            <p className="py-2">
              Thank you for being an essential part of our educational journey.
              Your knowledge and experience will make a positive impact on
              countless lives. Let's embark on this educational adventure
              together and create a brighter future for our students.
            </p>
            <p className="py-1 text-base">Member since :</p>
            <p className="text-base">Email verified :</p>
            <p className="py-1 text-base">Mobile verified :</p>
          </div> */}
          {/* <div>
            <img className="w-128" src={icon} alt="" />
          </div> */}
          {/* </div> */}
          <div className="bg-white shadow-md rounded-md p-6 w-full">
            <div className="flex items-center space-x-4">
              <img
                src={data?.data.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">{isStudent.username}</h2>
                <span className="bg-green-500 text-white font-semibold px-2 py-1 rounded-md">
                  Premium
                </span>
                <p className="text-gray-500">Grade: 10</p>
                <p className="text-gray-500">School: XYZ High School</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-gray-500">Email: {isStudent.email}</p>
                <p className="text-gray-500">Phone: +123 456 7890</p>
              </div>
              <div className="flex items-center">
                <div className="bg-yellow-300 p-4 rounded-full mr-4">
                  {/* Wallet icon or any other wallet-related content */}
                  💰
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Wallet Balance</p>
                  <p className="text-xl text-yellow-700 font-bold">{`Rs ${data?.data?.wallet??0} `}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row h-24 justify-between mt-3 mx-1">
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="bg-white text-black mt-6 p-4">
              <h2 className="font-semibold text-2xl">
                Your schedule for this week
              </h2>
              <div className=" ms-4 mt-9">
                <ol className="relative border-l border-gray-200">
                  {schedule.map((schedules, index) => (
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                        <svg
                          className="w-2.5 h-2.5 text-blue-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </span>
                      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                        {" "}
                        {new Date(schedules.timing.date)
                          .toISOString()
                          .slice(0, 16)
                          .replace("T", " ")}{" "}
                      </h3>
                  
                      <p className="mb-4 text-base font-normal text-gray-500">
                        Tutor : {schedules.tutorDetails[0].name}
                      </p>
                      <button
                        onClick={() =>
                          StartClass(schedules.timing._id, schedules)
                        }
                      >
                        Start Class
                      </button>
                    
                      <button onClick={() => handleCancel(schedules)}>
                        Cancel
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
