import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TutorDetails } from "../../api/tutorapi";
import { studentDetails } from "../../api/studentapi";
import { CiCalendarDate } from "react-icons/ci";
import { RootState } from "../../store";

interface NotificationDropdownProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationDropdown:React.FC<NotificationDropdownProps> = ({setSidebar}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([])
  // const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { isStudent } = useSelector((state:RootState) => state.auth);

  const { isTutor } = useSelector((state:RootState) => state.auth)

  const tutorData = async () => {
    const tutor = await TutorDetails(isTutor._id)
    setNotifications(tutor?.data.notifications)
  }

  const studentData = async () => {
    const student = await studentDetails(isStudent._id)
    setNotifications(student?.data.notifications)
  }
  useEffect(() => {
    if (isStudent) {
      studentData();
    } else if (isTutor) {
      tutorData();
    }
  }, [isStudent, isTutor]);
  
  const handleModal = () => {
    setSidebar(true)
    setIsOpen(false)
  };
 

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 block p-2 text-white bg-transparent border border-transparent rounded-md  focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-white "
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80"
        >
          <div className="py-2">
            {/* Notification items */}
            {notifications.slice(-2).map((item:{type:string,title:string,content:string}) => (
              <a
                href="#"
                className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 "
              >
                  <div>
              {item.type == "wallet" ? <div className="bg-yellow-300 p-4 rounded-full mr-4">
                {/* Wallet icon or any other wallet-related content */}
                💰
              </div> : <div className="mr-4"> <CiCalendarDate style={{ fontSize: "3rem" }} /></div>}

            </div>
                <div className="flex flex-col items-start">
                  <p className="mx-2 text-sm text-gray-600">
                    <span className="font-bold text-blue-500 hover:underline">
                      {item.title}
                    </span>{" "}
                  </p>
                  <p className="mx-2 text-sm text-gray-600  text-left">
                    {" "}
                    {item.content}
                  </p>
                </div>
              </a>
            ))}

            {/* Replace the following with your actual notification data */}
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50"
            >
              {/* Notification content */}
            </a>
            {/* Add more notification items as needed */}
          </div>
          {/* See all notifications link */}
          <li className="bg-gray-200 text-black p-2 list-none" onClick={()=>handleModal()}>See all notifications</li>
         
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
