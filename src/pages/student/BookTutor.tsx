import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../components/common/navbar";
import img from "../../assets/Screenshot_2023-11-02_000343-removebg-preview.png";
import { useQuery,useMutation } from "react-query";
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
  const { data: schedules, isLoading, isError, refetch } = useQuery("schedule", () =>
  getTutorSchedule(params.id), {
    onSuccess: (data) => {
      const groupedDates = data.data[0].timing.reduce(
        (grouped: any, item: any) => {
          console.log(item.date,"item.date");
          
          const date = new Date(item.date).toLocaleDateString();
console.log(date,"date");

          if (!grouped[date]) {
            grouped[date] = [];
          }
          const datee = new Date(item.date); // Convert the string to a Date object
          const hours = String(datee.getUTCHours()).padStart(2, '0'); // Get hours in 2-digit format
          const minutes = String(datee.getUTCMinutes()).padStart(2, '0'); // Get minutes in 2-digit format
          const timeString = `${hours}:${minutes}`; // Create a time string in HH:MM format
          
          grouped[date].push(timeString);
          return grouped;
        },
        {}
      );
      setTutorSchedule(groupedDates);
    },
  }
);
console.log(tutorSchedule,"tutorSchedule");


  const bookTutorMutation = useMutation(bookTutor, {
    onSuccess: (data) => {
      toast.success("Booking successful");
      refetch();
    },
    onError: (error) => {
      console.error("Error while booking tutor: ", error);
      toast.error("Booking failed");
    }
  });

  const handleClick = async (time: string) => {
    const givenDate = new Date(`${value}`);
    const givenHour = time;
    const [hours, minutes] = givenHour.split(":").map(Number);
  
    givenDate.setHours(hours);
  givenDate.setMinutes(minutes);

  const utcDate = new Date(givenDate.getTime() - (givenDate.getTimezoneOffset() * 60000));

  const object1 = {
    tutor: params.id,
    timing: {
      date: utcDate.toISOString(), // Send the UTC date to the API
      student: isStudent._id,
    },
  };
  
    // Perform the booking action using mutation
    bookTutorMutation.mutate(object1);
  };
  

  useEffect(() => {
    // Refetch tutor schedules after successful booking
    if (bookTutorMutation.isSuccess) {
      // toast.success("Booking sucessfull")
      refetch();
    }
  }, [bookTutorMutation.isSuccess, refetch]);
  
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
