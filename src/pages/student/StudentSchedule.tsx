import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import socket from "../../services/socket";
import { cancelBooking } from "../../api/tutorapi";
import { getStudentSchedule } from "../../api/studentapi";
import Navbar from "../../components/common/navbar";
import StudentSidebar from "../../components/students/StudentSidebar";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { Schedule } from "../../model/scheduleModel";

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [toggle, setToggle] = useState(true);
  const { isStudent } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    refetch: refetchSchedule,
  } = useQuery({
    queryFn: () => getStudentSchedule(isStudent._id),
    queryKey: ["StdSchedule"],
    onSuccess: (data) => {
      if (data) {
        setSchedule(data.data);
      }
    },
  });
  console.log(schedule);

  const student = isStudent._id;
  const StartClass = useCallback(
    (id: string, schedule: Schedule) => {
      console.log("Callback");
      let room = id;
      socket.emit("room:join", { student, room });
      const data = {
        tutor: schedule.tutor,
        student: isStudent._id,
      };
      localStorage.setItem("videocall", JSON.stringify(data));
    },
    [socket]
  );
  const handleJoinRoom = useCallback(
    (data: { tutor: string; room: string }) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    []
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    // Clean up event listener when component unmounts
    return () => {
      socket.off("room:join");
    };
  }, []);

  const handleCancel = async (data: any) => {
    const obj = {
      tutor: data.tutor,
      fee: data.timing.fee,
      id: data.timing.student,
      schedule: data.timing._id,
      timing: {
        date: data.timing.date,
      },
    };
    const response = await cancelBooking(obj);
    console.log(response);
    await refetchSchedule();
    toast.success("Cancelled");
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div>
          <StudentSidebar />
        </div>
        <div className="w-1/3">
          <div className="bg-white text-black mt-6 p-4">
            <h2 className="font-semibold text-2xl">
              Your schedule for this week
            </h2>
            <div className=" ms-4 mt-9">
              <div className="flex mt-4">
                <span
                  className={`cursor-pointer ${
                    toggle
                      ? "font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setToggle(true)}
                >
                  Upcoming
                </span>
                <span
                  className={`mx-4 cursor-pointer ${
                    !toggle
                      ? "font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Session History
                </span>
              </div>

              {toggle ? (
                <ol className="relative border-l border-gray-200 my-5">
                  {schedule.map((schedules: Schedule, index) =>
                  (  new Date(schedules?.timing.date) >= new Date() && schedules.timing.status !=="Cancelled By Student") ? (
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
                        <div className="bg-blue-100 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
                          {" "}
                          <div className="flex gap-3">
                            <div className="flex justify-center items-center">
                              <img
                                className="w-12 h-12 rounded-full"
                                src={schedules.tutorDetails[0].image}
                                alt=""
                              />
                            </div>
                            <div>
                              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                {"Date : "}
                                {new Date(schedules?.timing.date)
                                  .toISOString()
                                  .slice(0, 16)
                                  .replace("T", " ")}{" "}
                              </h3>
                              {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Released on January 13th, 2022</time> */}

                              <p className="mb-4 text-base font-normal text-gray-500">
                                Tutor : {schedules.tutorDetails[0].name}
                              </p>

                              <button
                                className="text-green-600 text-lg"
                                onClick={() =>
                                  StartClass(schedules.timing._id, schedules)
                                }
                              >
                                Start Class
                              </button>
                              {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700">Download ZIP</a> */}
                              <button
                                className="text-red-500"
                                onClick={() => handleCancel(schedules)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ol>
              ) : (
                <ol className="relative border-l border-gray-200">
                  {schedule.map((schedules, index) =>
                     (
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
                      <div className="bg-blue-100 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
                        {" "}
                        <div className="flex gap-3">
                          <div className="flex justify-center items-center">
                            <img
                              className="w-12 h-12 rounded-full"
                              src={schedules.tutorDetails[0].image}
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                              {"Date : "}
                              {new Date(schedules?.timing.date)
                                .toISOString()
                                .slice(0, 16)
                                .replace("T", " ")}{" "}
                            </h3>
                            {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Released on January 13th, 2022</time> */}

                            <p className="mb-4 text-base font-normal text-gray-500">
                              Tutor : {schedules.tutorDetails[0].name}
                            </p>
                            <p className="pt-1">
                            Status: {schedules.timing.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    )
                  )}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
