import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../components/common/navbar";
import img  from '../../assets/Screenshot_2023-11-02_000343-removebg-preview.png'

const BookTutor = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [value, onChange] = useState<Date | [Date, Date]>(tomorrow);

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
            <img
              className="h-72 w-full object-cover"
              src={img}
              alt=""
            />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 gap-8 p-6 pb-20 mt-10 bg-white">
          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a date
            </p>
            <div className="border p-4 rounded">
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>

          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a time
            </p>
            <div className="grid grid-cols-4 gap-2 lg:max-w-xl">
              <button className="rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95">
                12:00
              </button>
              <button className="rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95">
                9:00
              </button>
              <button className="rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95">
                11:00
              </button>
              {/* Other time buttons */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTutor;
