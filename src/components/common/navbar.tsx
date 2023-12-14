import React, { useState } from "react";
import logo from "../../assets/image-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/studentapi";
import { tutorLogout } from "../../api/tutorapi";
import { logoutTutor, logoutstudent } from "../../slice/authSlice";
import { toast } from "react-toastify";
import NotificationDropdown from "./NotificationDropdown";
import NotificationModal from "./NotificationModal";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();
  const { isStudent } = useSelector((state: any) => state.auth);
  const { isTutor } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    if (isStudent) {
      await logout();
      dispatch(logoutstudent());
      toast.success("Logout Success");
      navigate("/student");
    } else if (isTutor) {
      await tutorLogout();
      dispatch(logoutTutor());
      toast.success("Logout Success");
      navigate("/student");
    }
  };

  return (
    <>
      <div className="bg-3447AE font-sans w-full m-0">
        <div className="bg-3447AE shadow px-8">
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between py-4">
              <div>
                <Link to={"/"}>
                  {" "}
                  <img
                    className="w-32 h-13 text-purple-600"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="hidden sm:flex sm:items-center">
                <Link
                  to={"/"}
                  className="text-white text-sm font-semibold relative inline-block mr-4 group"
                >
                  Home
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link
                  to={"/about-us"}
                  className="text-white text-sm font-semibold relative inline-block mr-4 group"
                >
                  About
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                </Link>
                {!isTutor&&<Link
                    to={"/tutor/all-tutors"}
                    className="text-white text-sm font-semibold relative inline-block mr-4 group"
                  >
                    Find Tutor
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                  </Link>}
              { ! isTutor && <Link
                  to={"/live-classroom"}
                  className="text-white text-sm font-semibold relative inline-block mr-4 group"
                >
                  Classroom
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                </Link>}
                {!(isStudent || isTutor) ?
                <><Link
                    to={"/tutor/signup"}
                    className="text-white text-sm font-semibold relative inline-block mr-4 group"
                  >
                      Become Tutor
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                    </Link></> :
                <><Link
                    to={isStudent?"/student/schedule":"/tutor/tutor-schedule"}
                    className="text-white text-sm font-semibold relative inline-block mr-4 group"
                  >
                    Schedule
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                  </Link>
                    <Link
                    to={isStudent?"/student/homework-help":"/tutor/homework-help"}
                    className="text-white text-sm font-semibold relative inline-block mr-4 group"
                  >
                      Homework Help
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                    </Link></>
                }
              </div>

              <div className="hidden sm:flex sm:items-center">
                {isStudent || isTutor ? (
                  <div className="flex justify-center items-center text-center">
                    <Link
                      to={
                        isStudent
                          ? "/student/dashboard"
                          : "/tutor/tutordashboard"
                      }
                      className="text-white text-sm font-semibold relative inline-block mr-4 group"
                    >
                      <div className="flex flex-row justify-center items-center">
                        {isTutor && (
                          <img
                            className="w-6 rounded-full mr-1"
                            src={isTutor.image}
                            alt=""
                          />
                        )}
                        My Profile
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white text-sm font-semibold relative inline-block mr-4 group"
                    >
                      Logout
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                    </button>

                    {sidebar ? (
                      <NotificationModal setSidebar={setSidebar} />
                    ) : (
                      <NotificationDropdown setSidebar={setSidebar} />
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to={"/student"}
                      className="text-white text-sm font-semibold relative inline-block mr-4 group"
                    >
                      Sign in
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                    </Link>
                    <Link
                      to={"/student/signup"}
                      className="text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
              <div className="sm:hidden">

              </div>
            {(isStudent ||isTutor) &&  <div className="sm:hidden cursor-pointer flex items-end justify-end">
                   {(isTutor || isStudent) && sidebar ? (
                          <NotificationModal setSidebar={setSidebar} />
                        ) : (
                          <NotificationDropdown setSidebar={setSidebar} />
                        )}
              </div>}
           
              <div className="sm:hidden cursor-pointer" onClick={toggleNavbar}>
                <div className="flex items-center gap-2">
                   <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.22385763 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"
                  />
                </svg>
                
                </div>
               
              </div>
            </div>
            <div
              className={`block sm:hidden bg-3447AE border-t-2 py-2 ${
                open ? "" : "hidden"
              }`}
            >
              <div className="flex flex-col">
                <Link
                  to={"/"}
                  className="text-white text-sm font-semibold hover:underline hover:text-white mb-1"
                >
                  Home
                </Link>
                <Link
                  to={"/about-us"}
                  className="text-white text-sm font-semibold hover:underline hover:text-white mb-1"
                >
                  About
                </Link>

                <Link
                  to={"/tutor/all-tutors"}
                  className="text-white text-sm font-semibold hover:underline hover:text-white mb-1"
                >
                  Find Tutor
                </Link>
                { ! isTutor && <Link
                  to={"/live-classroom"}
                  className="text-white text-sm font-semibold relative inline-block mr-4 group"
                >
                  Classroom
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                </Link>}
                <Link
                  to={"/tutor/signup"}
                  className="text-white text-sm font-semibold hover:underline hover:text-white mb-1"
                >
                  Become Tutor
                </Link>

                <div className="flex justify-between items-center border-t-2 pt-2">
                  {isStudent || isTutor ? (
                    <>
                      <span className="text-white text-sm font-semibold hover:underline hover:text-white mr-4">
                        <Link
                          to={
                            isStudent
                              ? "/student/dashboard"
                              : "/tutor/tutordashboard"
                          }
                        >
                          {" "}
                          My profile
                        </Link>
                      </span>
                      <span className="text-white text-sm font-semibold border px-4 py-1 rounded-lg hover:underline hover:text-white ">
                        <button
                          onClick={handleLogout}
                          className="text-white text-sm font-semibold relative inline-block mr-4 group"
                        >
                          Logout
                          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white origin-bottom transform scale-x-0 transition duration-300 group-hover:scale-x-100"></span>
                        </button>
                    
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-white text-sm font-semibold hover:underline hover:text-white mr-4">
                        <Link to={"/student"}> Sign in</Link>
                      </span>
                      <span className="text-white text-sm font-semibold border px-4 py-1 rounded-lg hover:underline hover:text-white ">
                        <Link to={"/student/signup"}> Sign up</Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
