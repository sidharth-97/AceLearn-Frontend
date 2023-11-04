import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../components/common/navbar";
import img from "../../assets/Screenshot_2023-11-02_000343-removebg-preview.png";
import { useQuery } from "react-query";
import { bookTutor, getTutorSchedule } from "../../api/tutorapi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'

const BookTutor = () => {
  const today = new Date();
  const [value, onChange] = useState<Date>(today);
  const [tutorSchedule, setTutorSchedule] = useState<any>({});
  const[object,setObject]=useState({})

  const params: any = useParams();
  const { isStudent } = useSelector((state: any) => state.auth);

  const { data: schedules, isLoading, isError } = useQuery("schedule", () =>
    bookTutor(object)
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTutorSchedule(params.id);
        console.log(response.data);

        const groupedDates = response.data[0].timing.reduce(
          (grouped: any, item: any) => {
            const date = new Date(item.date).toLocaleDateString();

            if (!grouped[date]) {
              grouped[date] = [];
            }

            grouped[date].push(new Date(item.date).toLocaleTimeString());
            return grouped;
          },
          {}
        );

        console.log(groupedDates, "grouped dates");
        setTutorSchedule(groupedDates);
      } catch (error) {
        console.error("Error fetching tutor schedule: ", error);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    if (schedules) {
      toast.success("Booking successfull")
    }
  }, [schedules]);

  const handleClick = (time: string) => {
    const givenDate = new Date(`${value}`);
    const givenHour = time;

    const [hours, minutes] = givenHour.split(":").map(Number);

    givenDate.setHours(hours);
    givenDate.setMinutes(minutes);


    const object1 = {
      tutor: params.id,
      timing: {
        date: givenDate,
        student: isStudent._id,
      },
    };
    setObject(object1)
    bookTutor(object)
    console.log(schedules, "this is the schedules");
    
  }
  return (
    <>
      <Navbar />

      <div className="w-full bg-blue-50 pt-7">
        <div className="mx-auto max-w-screen-lg grid grid-cols-4 gap-8 p-6 pb-20 shadow-xl shadow-gray-300 bg-white">
          <div className="col-span-2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-blue-900 text-center">
              Book an appointment
            </h1>
            <p className="text-lg text-blue-900 text-center">
              Get an appointment with our experienced tutors
            </p>
          </div>

          <div className="col-span-2">
            <img className="h-72 w-full object-cover" src={img} alt="" />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 gap-8 p-6 pb-20 mt-10 bg-white">
          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a date
            </p>
            <div className="border p-4 rounded">
              <Calendar
                onChange={onChange}
                value={value}
                className="my-booking-calendar"
              />
            </div>
          </div>

          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a time
            </p>
            <div className="grid grid-cols-4 gap-2 lg:max-w-xl">
              {tutorSchedule[value.toLocaleDateString()] &&
                tutorSchedule[value.toLocaleDateString()].map((time, index) => (
                  <button
                    onClick={()=>handleClick(time)}
                    key={index}
                    className="rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95 animated-button"
                  >
                    {time}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTutor;
