import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { logoutAdmin } from "../../slice/authSlice";

const AdminSidebar = () => {
  const menus = [
    { name: "dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "students", link: "/admin/students", icon: AiOutlineUser },
    { name: "tutors", link: "/admin/tutors", icon: FiMessageSquare },
    { name: "subjects", link: "/admin/subjects", icon: TbReportAnalytics, margin: true },
    { name: "Premium", link: "/admin/premium", icon: FiFolder },
  ];
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()
  const navigate=useNavigate()
  
  const {isAdmin}=useSelector((state:any)=>state.auth)

  const adminLogout = () => {
    if (isAdmin) {
      dispatch(logoutAdmin())
      toast.success("Logout successfull")
      navigate('/admin/login')
  }
}

  return (
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
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
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
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
        <button onClick={adminLogout}>logout</button>
        </div>
      </div>
   

  );
};

export default AdminSidebar;
