import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare} from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";
import { IoIosList } from "react-icons/io";

const StudentSidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/student", icon: MdOutlineDashboard },
    { name: "Edit profile", link: "/student/profile", icon: AiOutlineUser },
    { name: "Hire a tutor", link: "/student/requesttutor", icon: IoIosList },
    { name: "Requests", link: "/student/requests", icon: TbReportAnalytics, margin: true },
    { name: "Notifications", link: "/student/notifications", icon: MdOutlineNotificationsActive },
    { name: "Messenger", link: "/student/messenger", icon: FiMessageSquare },
    { name: "Schedule", link: "/student/schedule", icon: GrSchedule, margin: true },
    { name: "Homework help", link: "/student/homework-help", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (

      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-black px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-9ED0F5 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
   

  );
};

export default StudentSidebar;
