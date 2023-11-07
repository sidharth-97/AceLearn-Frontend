import React, { useState } from "react";
import avatar from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513fdf.jpg";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { getStudentSchedule } from "../../api/studentapi";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const [schedule, setSchedule] = useState([]);
  const { isStudent } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getStudentSchedule(isStudent._id),
    queryKey: ["StdSchedule"],
    onSuccess: (data) => {
      if (data) {
        setSchedule(data.data);
      }
    },
  });
  console.log(schedule);

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
          <div>
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
                      {new Date(schedules.timing.date).toLocaleString()}{" "}
                    </h3>
                    {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Released on January 13th, 2022</time> */}
                    <p className="mb-4 text-base font-normal text-gray-500">
                      Tutor : {schedules.tutorDetails[0].name}
                    </p>
                    {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700">Download ZIP</a> */}
                  </li>
                ))}
              </ol>
</div>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
