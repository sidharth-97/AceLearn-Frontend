import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  changeSchedule,
  getTutorSchedule,
  scheduledate,
} from "../../api/tutorapi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";

const TutorScheduleCalender = () => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const [value, onChange] = useState<Date | [Date, Date]>();
  const [selectedTime, setSelectedTime] = useState("");
  const [schedule, setSchedule] = useState([]);

  const navigate = useNavigate();

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
      return toast.error("Pick a date and time");
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
    if (reponse?.status == 200) toast.success("Scheduling success");
  };

  return (
    <div>
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
      </div>
    </div>
  );
};

export default TutorScheduleCalender;
