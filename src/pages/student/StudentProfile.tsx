import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const StudentProfile = () => {
  const { isStudent } = useSelector((state: RootState) => state.auth);
  const { data } = useQuery({
    queryFn: () => studentDetails(isStudent._id),
  });
  console.log(data?.data);

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />

        <div className="p-5 lg:p-14 xl:p-16 bg-9ED0F5 w-full">
          <div className="bg-white shadow-md rounded-md p-6 w-full">
            <div className="flex items-center space-x-4">
              <img
                src={data?.data.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">{isStudent.username}</h2>
                <span className="bg-green-500 text-white font-semibold px-2 py-1 rounded-md">
                  Premium
                </span>
                <p className="text-gray-500">Grade: 10</p>
                <p className="text-gray-500">School: XYZ High School</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-gray-500">Email: {isStudent.email}</p>
                <p className="text-gray-500">Phone: +123 456 7890</p>
              </div>
              <div className="flex items-center">
                <div className="bg-yellow-300 p-4 rounded-full mr-4">
                  {/* Wallet icon or any other wallet-related content */}
                  💰
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Wallet Balance</p>
                  <p className="text-xl text-yellow-700 font-bold">{`Rs ${
                    data?.data?.wallet ?? 0
                  } `}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row h-24 justify-between mt-3 mx-1">
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
