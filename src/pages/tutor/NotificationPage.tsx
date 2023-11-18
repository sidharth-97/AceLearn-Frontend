import React from "react";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import Notifications from "../../components/tutors/Notifications";

const NotificationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <TutorSidebar />
        <div className='flex flex-grow justify-center items-center bg-[#F4F7FF]'>
            <div className='bg-white p-10'>
              <h1 className='text-2xl font-bold text-center bg-gray-200 rounded-md p-2'>Notifications</h1>
              <Notifications />
            </div>
          </div>
      </div>
    </div>
  );
};

export default NotificationPage;
