import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getTutorSchedule,
  scheduledate,
} from "../../api/tutorapi";

const TutorScheduleCalendar = ({setChange}) => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
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

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleDateClick = (value: Date) => {
    setSelectedDates((prevDates) => {
      const dateExists = prevDates.find((date) => date.toDateString() === value.toDateString());

      if (dateExists) {
        // Deselect the date
        return prevDates.filter((date) => date.toDateString() !== value.toDateString());
      } else {
        // Select the date
        return [...prevDates, value];
      }
    });
  };

  const handleSchedule = async () => {
    if (selectedDates.length === 0 || !selectedTime) {
      return toast.error("Pick date(s) and time");
    }

    for (const selectedDate of selectedDates) {
      const givenDate = new Date(selectedDate);

      const [hours, minutes] = selectedTime.split(":").map(Number);

      givenDate.setHours(hours + 5); // Adding 5 hours to adjust for the time zone
      givenDate.setMinutes(minutes + 30);

      const data = {
        tutor: isTutor._id,
        timing: {
          date: givenDate.toISOString(),
        },
      };

      const response = await scheduledate(data);

      if (response?.status === 200) {
        toast.success("Scheduling success");
        setChange(true)
      }
    }
  };
  
  console.log(selectedDates,"selectedndat");
  

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
          onChange={handleDateClick}
          value={selectedDates}
          tileDisabled={({ date }) => date < new Date()}
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
              {selectedDates && (
                <p className="pt-5 text-lg font-semibold">
                  Classes on{" "}
                  {Array.isArray(selectedDates) && selectedDates.length > 0
                    ? selectedDates.map((date) => date.toDateString()).join(", ")
                    : selectedDates.toString()}{" "}
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
  );
};

export default TutorScheduleCalendar;
