import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TutorDetails } from "../../api/tutorapi";
import { studentDetails } from "../../api/studentapi";
import { CiCalendarDate } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../store";
import Pagination from "../UI/Pagination";

interface NotificationDropdownProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationModal:React.FC<NotificationDropdownProps> = ({ setSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const[activePage,setActivePage]=useState(1)

  const { isStudent } = useSelector((state:RootState) => state.auth);
  const { isTutor } = useSelector((state:RootState) => state.auth);

  const getData = async () => {
    if (isStudent) {
      const student = await studentDetails(isStudent._id);
      setNotifications(student?.data.notifications);
    } else if (isTutor) {
      const tutor = await TutorDetails(isTutor._id);
      setNotifications(tutor?.data.notifications);
    }
  };

  useEffect(() => {
    getData();
  }, [isStudent, isTutor]);

  const modalContainerStyles = {
    height: "100%",
    maxHeight: "100vh",
    maxWidth: "100%",
    backgroundColor: "white",
    borderLeft: "1px solid #e2e8f0",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
  };
  const itemsPerPage = 7
  const limit = Math.round(notifications.length / 7)
  console.log(limit,"limit");
  
  const startIndex = (activePage - 1) * itemsPerPage
  const endIndex = activePage * itemsPerPage

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: isOpen ? 0 : "100%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-end overflow-x-hidden overflow-y-hidden"
        >
          <div style={modalContainerStyles} className=" w-3/4 sm:w-1/4 ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-2xl font-semibold text-center w-full">Notifications</h3>
                <button
                  type="button"
                  className=" text-xl font-bold"
                  onClick={() => {
                    setIsOpen(false);
                    setSidebar(false);
                  }}
                >
                  X
                </button>
              </div>
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            <div className="relative flex-auto overflow-y-auto">
              <div className="py-2 px-2">
                { notifications&&[...notifications].reverse()
                  .slice(startIndex,endIndex)
                  .map((item: { type: string; title: string; content: string }, index) => (
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50"
                    key={index}
                  >
                    <div>
                      {item.type === "wallet" ? (
                        <div className="bg-yellow-300 p-4 rounded-full mr-4">
                          💰
                        </div>
                      ) : (
                        <div className="mr-4">
                          {" "}
                          <CiCalendarDate style={{ fontSize: "3rem" }} />
                        </div>
                      )}
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
              </div>
              <Pagination
                activePage={activePage}
                setActive={setActivePage}
                limit={limit}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
