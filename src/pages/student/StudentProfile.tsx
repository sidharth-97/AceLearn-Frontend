import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WalletHistory from "../../components/common/WalletHistory";
import TimelineApp from "../../components/students/HeatMap";
import { FaWallet } from "react-icons/fa";
import { useEffect } from "react";
import socket from "../../services/socket";

const StudentProfile = () => {
  const { isStudent } = useSelector((state: RootState) => state.auth);
  const { data: stdData } = useQuery({
    queryFn: () => studentDetails(isStudent._id),
    queryKey: ["stdDetail"],
  });
  console.log(stdData?.data, "wallet");
  useEffect(() => {
    socket.on("getMessage", ({ text, image }) => {
      console.log("*********************************");
  
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("New Message", {
          body: text,
          icon: "path/to/your/icon.png",
        });
      } else if (typeof Notification !== "undefined" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("New Message", {
              body: text,
              icon: "path/to/your/icon.png",
            });
          }
        });
      }
    });
  });
  
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />

        <div className="lg:p-14 xl:p-16 bg-gray-100 w-full sm:p-5 overflow-x-hidden">
          <div className="bg-white shadow-md rounded-md w-full overflow-x-hidden sm:p-6">
            {/* <div className="flex items-center space-x-4">
              <img
                src={stdData?.data.image}
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
            </div> */}
            <div style={{ position: "relative" }}>
              <img
                className="h-20 w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/001/228/721/non_2x/blue-gradient-with-dynamic-blended-line-design-vector.jpg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "",
                 
                  transform: "translate(-50%, -50%)",
                }}
                className="left-1/2 sm:left-16"
              >
                <img
                  src={stdData?.data.image}
                  alt={stdData?.data.image}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-between flex-col overflow-x-hidden sm:flex-row">
              <div className="flex flex-col mt-16 p-2">
                <h2 className="text-2xl font-semibold">{isStudent.username}</h2>
                <div>
                  <p className="text-gray-500">Email: {isStudent.email}</p>
                  <p className="text-gray-500">Phone: {isStudent.mobile}</p>
                </div>
              </div>
              <div className="mt-6 mb-2 flex items-center justify-center space-x-3 sm:mt-16">
                <div className="flex items-center gap-1 sm:flex-col ">
                  <div className="flex items-center gap-1">
                    <FaWallet
                      className="text-blue-500"
                      style={{ fontSize: "2.5rem" }}
                    />
                    <h1 className="text-xl text-yellow-700 font-bold">
                      {`Rs ${stdData?.data?.wallet ?? 0}`}
                    </h1>
                  </div>

                  <WalletHistory walletHistory={stdData?.data.walletHistory} />
                </div>
              </div>
            </div>

            {/* <div className="mt-4 flex justify-between items-center">
            
              <div className="flex items-center">
                <div className="bg-yellow-300 p-4 rounded-full mr-4">
                  💰
                </div>
              
                <div>
                  <p className="text-gray-700 font-semibold">Wallet Balance</p>
                  <p className="text-xl text-yellow-700 font-bold">{`Rs ${
                    stdData?.data?.wallet ?? 0
                  } `}</p>  <WalletHistory walletHistory={stdData?.data.walletHistory}/>
                </div>
              </div>
            </div> */}
          </div>
          <div className="bg-white mt-5 pt-2 ps-3 text-lg">
            <h1>Class timeline</h1>
            <div className="flex flex-row justify-between mt-3 mx-1 bg-white overflow-y-auto">
              <TimelineApp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
