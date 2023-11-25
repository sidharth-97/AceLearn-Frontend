import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import {
  changeSchedule,
  getTutorSchedule,
  scheduledate,
} from "../../api/tutorapi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import socket from "../../services/socket";
import { useNavigate } from "react-router-dom";
import WalletHistory from "../../components/common/WalletHistory";

   const TutorProfile = () => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const [value, onChange] = useState<Date | [Date, Date]>();
  const [selectedTime, setSelectedTime] = useState("");
  const [schedule, setSchedule] = useState([]);

  const navigate=useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTutorSchedule(isTutor._id),
    queryKey: ["timeline"],
    onSuccess: (data) => {
      if (data) {
        setSchedule(data?.data[0].timing);
      }
    },
  });

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  console.log(selectedTime);
  console.log(value);

  const handleSchedule = async () => {
    if (!value) {
     return  toast.error("Pick a date and time")
    }
    const givenDate = new Date(`${value}`);
    const givenHour = selectedTime;
    console.log(givenDate);

    const [hours, minutes] = givenHour.split(":").map(Number);

 
    givenDate.setHours(hours + 5); // Adding 5 hours to adjust for the time zone
    givenDate.setMinutes(minutes + 30);
    
    console.log(givenDate, "divvng");
    const data = {
      tutor: isTutor._id,
      timing: {
        date: `${givenDate}`,
      },
    };
    console.log(data);

    const reponse = await scheduledate(data);
    if (reponse?.status == 200) toast.success("Scheduling success")
    
  };



  //socket io
  const Socket = socket
  const tutor = isTutor._id;
 
  
  const StartClass = useCallback((schedule) => {
    const room =schedule._id
    Socket.emit('room:join', { tutor, room });
    const data = {
      tutor: isTutor._id,
      student:schedule.student
    }
      localStorage.setItem("videocall",JSON.stringify(data))
    
  }, [Socket]);
  
  const handleJoinRoom = useCallback((data:{tutor:string,room:string}) => {
    const { tutor, room } = data
    navigate(`/room/${room}`)
    
},[])

  useEffect(() => {
    Socket.on('room:join',handleJoinRoom);

    // Clean up event listener when component unmounts
    return () => {
        Socket.off('room:join');
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
            
              <p className="py-1 text-base">💰 Wallet Rs: {isTutor.wallet??0}</p>
              {/* <p className="text-base">Email verified : true</p> */}
              {/* <p className="py-1 text-base">Mobile verified :</p> */}
              <WalletHistory walletHistory={isTutor.walletHistory}/>
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

          <div className="">
            <div className="bg-white mt-8 flex flex-col gap-3 justify-center items-center p-9">
              <div>
                <h2 className="font-semibold text-2xl">Schedule your class</h2>
              </div>
              <div className="flex flex-row gap-10 mt-5">
                <div>
                  {" "}
                  <Calendar
                    value={value}
                    tileDisabled={({ date }) => date < new Date()}
                    onChange={onChange}
                    className="my-custom-calendar"
                  />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-blue-900">
                    Select a time
                  </p>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="mt-2 p-2.5 rounded-lg border  border-blue-300 bg-blue-100 text-blue-800 outline-none ring-opacity-30 focus:ring focus:ring-blue-300"
                  />
                  {value && (
                    <p className="pt-5 text-lg font-semibold">
                      Class on {value instanceof Date && value.toDateString()}{" "}
                      at {selectedTime}
                    </p>
                  )}
                  <button
                    onClick={handleSchedule}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 mt-5"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
