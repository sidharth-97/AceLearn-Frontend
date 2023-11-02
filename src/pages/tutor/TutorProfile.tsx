import { useState } from "react";
import { useSelector } from "react-redux";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { scheduledate } from "../../api/tutorapi";

const TutorProfile = () => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const [value, onChange] = useState<Date | [Date, Date]>();
  const [selectedTime, setSelectedTime] = useState("");
  const [schedule, setSchedule] = useState([]);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  console.log(selectedTime);
  console.log(value);

  const handleSchedule = async () => {
    const givenDate = new Date(`${value}`);
    const givenHour = selectedTime;

    const [hours, minutes] = givenHour.split(":").map(Number);

    givenDate.setHours(hours);
    givenDate.setMinutes(minutes);

    console.log(givenDate, "divvng");

    const data = {
      tutor: isTutor._id,
      timing: {
        date: givenDate,
        student: isTutor._id,
      },
    };
    const reponse = await scheduledate(data);

    setSchedule(reponse?.data.timing);
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <TutorSidebar />

        <div className="w-full p-4 bg-9ED0F5">
          <div className="flex bg-white justify-center items-center p-5 rounded-3xl">
            {" "}
            {/* Reduced padding */}
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
          <div className="bg-white mt-8 flex flex-col gap-3 justify-center items-center p-9">
            <div>
              <h2 className="font-semibold text-2xl">Schedule your class</h2>
            </div>
            <div className="flex flex-row gap-10 mt-5">
              <div>
                {" "}
                <Calendar
                  value={value}
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
                    Class on {value instanceof Date && value.toDateString()} at{" "}
                    {selectedTime}
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
           <div className="bg-white text-black mt-6 p-4">
      <h2 className="font-semibold text-2xl">Your schedule for this week</h2>
      <div className="mt-4">
        {schedule.map((schedules, index) => (
          <div key={index} className="bg-gray-100 p-4 mt-4 rounded-md">
            <p>Date: {new Date(schedules.date).toLocaleString()}</p>
            <p>Student: {schedules.student}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
