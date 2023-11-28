import React from "react";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import TutorSchedule from "../../components/tutors/TutorSchedule";
import TutorScheduleCalender from "../../components/tutors/TutorScheduleCalender";

const TutorSchedulePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <TutorSidebar />

        <div className="flex">
          <div className="flex-grow">
            <TutorScheduleCalender />
          </div>
          <div className="h-3/4 border-l border-gray-300 mx-4"></div>
          {/* Right Segment */}
          <div className="flex-grow">
            <TutorSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSchedulePage;
