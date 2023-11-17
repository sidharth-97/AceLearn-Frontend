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
  };

  const handleCancel = async (date) => {
    const obj = {
      tutor: isTutor._id,
      timing: {
        date: date,
      },
    };
    const response = await changeSchedule(obj);
    if (response?.status == 200) toast.success("Cancelled Successfully");
  };

  //socket io
  const Socket = socket
  const tutor = isTutor._id;
 
  
  const StartClass = useCallback((id) => {
    console.log("Callback",id);
    const room =id
      Socket.emit('room:join',{tutor,room});
      
    
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
              <p className="py-1 text-base">Member since :</p>
              <p className="text-base">Email verified :</p>
              <p className="py-1 text-base">Mobile verified :</p>
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

          <div className="bg-white text-black mt-6 p-4">
            <h2 className="font-semibold text-2xl">
              Your schedule for this week
            </h2>
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
                <div className="grid gap-4 mx-4 sm:grid-cols-12">
                  {/* <div className="col-span-12 sm:col-span-3">
				                <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
				               	<h3 className="text-3xl font-semibold">Morbi tempor</h3>
				               	<span className="text-sm font-bold tracki uppercase text-gray-400">Vestibulum diam nunc</span>
				                      </div>
		                      	</div> */}
                  <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                    {schedule.map((schedules, index) => (
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
                          {typeof schedules.student == "undefined" ? (
                            <button
                              className="bg-red-500 hover:bg-red-700 w-36 h-10 rounded-full text-white font-semibold shadow-md focus:outline-none focus:ring focus:border-red-300"
                              onClick={() => handleCancel(schedules.date)}
                            >
                              Cancel this class
                            </button>
                          ) : (
                              <>
                                <p className="text-green-400 font-bold">Booked</p>
                                <button onClick={()=>StartClass(schedules._id)}>Start Class</button>
                              </>
                            
                          )}
                          {/* <p className="mt-3">
                            Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                          </p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
