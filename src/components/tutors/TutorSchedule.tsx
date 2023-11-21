import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { getTutorSchedule, changeSchedule } from "../../api/tutorapi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom";

const TutorSchedule = () => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const [schedule, setSchedule] = useState([]);
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();

  const { data, isLoading, isError,refetch: refetchSchedule } = useQuery({
    queryFn: () => getTutorSchedule(isTutor._id),
    queryKey: ["timeline"],
    onSuccess: (data) => {
      if (data) {
        setSchedule(data?.data[0].timing);
      }
    },
  });

  const handleCancel = async (date, fee, student) => {
    const obj = {
      tutor: isTutor._id,
      fee: fee,
      id: student,
      timing: {
        date: date,
      },
    };
    const response = await changeSchedule(obj);
      if (response?.status == 200) toast.success("Cancelled Successfully");
      await refetchSchedule()
  };

  //socket io
  const Socket = socket;
  const tutor = isTutor._id;

  const StartClass = useCallback(
    (schedule) => {
      const room = schedule._id;
      Socket.emit("room:join", { tutor, room });
      const data = {
        tutor: isTutor._id,
        student: schedule.student,
      };
      localStorage.setItem("videocall", JSON.stringify(data));
    },
    [Socket]
  );

  const handleJoinRoom = useCallback(
    (data: { tutor: string; room: string }) => {
      const { tutor, room } = data;
      navigate(`/room/${room}`);
    },
    []
  );

  useEffect(() => {
    Socket.on("room:join", handleJoinRoom);

    // Clean up event listener when component unmounts
    return () => {
      Socket.off("room:join");
    };
  }, []);

  return (
    <>
      <div>TutorSchedule</div>
      <div className="bg-white text-black mt-6 p-4">
        <h2 className="font-semibold text-2xl">Your schedule for this week</h2>
        {/* <div className="mt-4">
              {schedule.map((schedules, index) => (
                <div key={index} className="bg-gray-100 p-4 mt-4 rounded-md">
                  <p>Date: {new Date(schedules.date).toLocaleString()}</p>
                  <p>Student: {schedules.student}</p>
                  {typeof(schedules.student)=="undefined" &&<button onClick={()=>handleCancel(schedules.date)}>Cancel</button>}
                </div>
              ))}
            </div> */}

        <section className="bg-white text-gray-600">
          <div className="container max-w-5xl px-4 py-12 mx-auto">
            <div className="flex mt-4">
              <span
                className={`cursor-pointer ${toggle ? "font-semibold" : ""}`}
                onClick={() => setToggle(true)}
              >
                Upcoming
              </span>
              <span
                className="mx-4 cursor-pointer"
                onClick={() => setToggle(false)}
              >
                Session History
              </span>
            </div>
            {toggle ? (
              <div className="grid gap-4 mx-4 sm:grid-cols-12">
                {/* <div className="col-span-12 sm:col-span-3">
				                <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
				               	<h3 className="text-3xl font-semibold">Morbi tempor</h3>
				               	<span className="text-sm font-bold tracki uppercase text-gray-400">Vestibulum diam nunc</span>
				                      </div>
		                      	</div> */}
                <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                  {schedule.map((schedules, index) =>
                    new Date(schedules.date) >= new Date() ? (
                      <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                        <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-400">
                          <h3 className="text-xl font-semibold tracki">
                            {new Date(schedules.date)
                              .toISOString()
                              .slice(0, 16)
                              .replace("T", " ")}
                          </h3>

                          {/* <time className="text-xs tracki uppercase text-gray-400">Dec 2020</time> */}
                          <p>Student Id: {schedules.student}</p>
                          <>
                            <button
                              className="bg-red-500 hover:bg-red-700 w-36 h-10 rounded-full text-white font-semibold shadow-md focus:outline-none focus:ring focus:border-red-300"
                              onClick={() =>
                                handleCancel(
                                  schedules.date,
                                  schedules.fee,
                                  schedules.student
                                )
                              }
                            >
                              Cancel this class
                              <>
                                {/* <p className="text-green-400 font-bold">Booked</p> */}
                                {schedules.date <= new Date() && (
                                  <button onClick={() => StartClass(schedules)}>
                                    Start Class
                                  </button>
                                )}
                              </>
                            </button>
                          </>

                          {/* <p className="mt-3">
                            Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                          </p> */}
                        </div>
                      </div>
                    ) : (
                      "No upcomming schedule"
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 mx-4 sm:grid-cols-12">
                {/* <div className="col-span-12 sm:col-span-3">
				                <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
				               	<h3 className="text-3xl font-semibold">Morbi tempor</h3>
				               	<span className="text-sm font-bold tracki uppercase text-gray-400">Vestibulum diam nunc</span>
				                      </div>
		                      	</div> */}
                <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                  {schedule.map((schedules, index) =>
                    new Date(schedules.date) <= new Date() ? (
                      <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                        <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-400">
                          <h3 className="text-xl font-semibold tracki">
                            {new Date(schedules.date)
                              .toISOString()
                              .slice(0, 16)
                              .replace("T", " ")}
                          </h3>

                          {/* <time className="text-xs tracki uppercase text-gray-400">Dec 2020</time> */}
                          <p>Student Id: {schedules.student}</p>
                          {/* <p className="mt-3">
                            Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                          </p> */}
                        </div>
                      </div>
                    ) : (
                      "Nothing to show here"
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TutorSchedule;
