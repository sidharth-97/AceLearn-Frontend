import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import socket from "../../services/socket";

import WalletHistory from "../../components/common/WalletHistory";
import NotificationModal from "../../components/common/NotificationModal";
import TutorSalesChart from "../../components/tutors/tutorSalesChart";

const TutorProfile = () => {
  const { isTutor } = useSelector((state: any) => state.auth);

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
      <Navbar />

      <div className="flex">
        <TutorSidebar />

        <div className="w-full p-4 bg-9ED0F5">
          <div className="flex bg-white justify-center items-center p-5 rounded-3xl">
            {" "}
            <div>
              <h2 className="font-semibold text-2xl">
                Welcome {isTutor.name},
              </h2>
              <p className="py-2">
                Thank you for being an essential part of our educational
                journey. Your knowledge and experience will make a positive
                impact on countless lives. Let's embark on this educational
                adventure together and create a brighter future for our
                students.
              </p>
              <NotificationModal />
              <p className="py-1 text-base">
                💰 Wallet Rs: {isTutor.wallet ?? 0}
              </p>
              {/* <p className="text-base">Email verified : true</p> */}
              {/* <p className="py-1 text-base">Mobile verified :</p> */}
              <WalletHistory walletHistory={isTutor.walletHistory} />
            </div>
            <div>
              <img className="w-128" src={icon} alt="" />
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
          <div className="bg-white mt-6">
            <h4>Income report</h4>
            <TutorSalesChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
