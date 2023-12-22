import React, { useState } from "react";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare} from "react-icons/fi";
import { Link } from "react-router-dom";
import { GrSchedule } from "react-icons/gr";
import { IoIosList } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";

// const StudentSidebar = () => {
//   const menus = [
//     { name: "Dashboard", link: "/student", icon: MdOutlineDashboard },
//     { name: "Edit profile", link: "/student/profile", icon: AiOutlineUser },
//     { name: "Hire a tutor", link: "/student/requesttutor", icon: IoIosList },
//     { name: "Requests", link: "/student/requests", icon: TbReportAnalytics, margin: true },
//     { name: "Messenger", link: "/student/messenger", icon: FiMessageSquare },
//     { name: "Schedule", link: "/student/schedule", icon: GrSchedule, margin: true },
//     { name: "Homework help", link: "/student/homework-help", icon: RiSettings4Line },
//   ];
//   const [open, setOpen] = useState(true);
//   return (

//       <div
//         className={`bg-white min-h-screen ${
//           open ? "w-72" : "w-16"
//         } duration-500 text-black px-4`}
//       >
//         <div className="py-3 flex justify-end">
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className="mt-4 flex flex-col gap-4 relative">
//           {menus?.map((menu, i) => (
//             <Link
//               to={menu?.link}
//               key={i}
//               className={` ${
//                 menu?.margin && "mt-5"
//               } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-9ED0F5 rounded-md`}
//             >
//               <div>{React.createElement(menu?.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden"
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>
   

//   );
// };

// export default StudentSidebar;






import {
  MdOutlineDashboard,

} from 'react-icons/md';


const Menus = [
  { title: "Dashboard", link: "/student", icon: <MdOutlineDashboard style={{ color: 'black' }}/> },
  { title: "Edit profile", link: "/student/profile", icon: <AiOutlineUser style={{ color: 'black' }}/> },
  { title: "Hire a tutor", link: "/student/requesttutor",icon: <IoIosList style={{ color: 'black' }}/> },
  { title: "Requests", link: "/student/requests", icon: <TbReportAnalytics style={{ color: 'black' }}/>, gap: true },
  { title: "Messenger", link: "/student/messenger", icon: <FiMessageSquare style={{ color: 'black' }}/> },
  { title: "Schedule", link: "/student/schedule", icon: <GrSchedule style={{ color: 'black' }}/>, margin: true },
  { title: "Homework help", link: "/student/homework-help", icon: <RiSettings4Line style={{ color: 'black' }}/> },
];

const StudentSidebar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
    console.log(subMenuOpen);
    setSubMenuOpen(false);
  };

  return (
    <div className="h-full flex items-end justify-end fixed sm:sticky z-50">
      <div>
          <button
        className="fixed lg:hidden z-90 top-28 right-8 bg-blue-500 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-black text-4xl hover:bg-blue-400 duration-300 z-10 p-3"
        onClick={toggleSidebar}
      >
        <span className="text-white">
          <MdOutlineMenu/>
        </span>
      </button>
      </div>
    

      <div
        className={`${
          open ? 'w-48 px-2' : 'w-0 opacity-0'
        } lg:w-72 bg-white h-screen relative duration-500`}
      >
        <div className="justify-center mt-3">
          <h1
            className={`text-black font-medium text-2xl text-center duration-200 ${
              !open && 'hidden'
            }`}
          >
             
          </h1>
        </div>
        <ul className="pt-6 relative sm:fixed">
          {open&&Menus.map((Menu, index) => (
            <React.Fragment key={index}>
              <Link to={Menu.link}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-100 text-black text-base font-medium items-center gap-x-4 ${
                  Menu?.gap ? 'mt-9' : 'mt-2'
                }`}
              >
                <span>{Menu.icon ? Menu.icon : <MdOutlineDashboard style={{ color: 'black' }}/>}</span>
                
                <span className="flex-1">{Menu.title}</span>
            
              </Link>
           
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar