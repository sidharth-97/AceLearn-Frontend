import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WalletHistory from "../../components/common/WalletHistory";
import TimelineApp from "../../components/students/HeatMap";


const StudentProfile = () => {
  const { isStudent } = useSelector((state: RootState) => state.auth);
  const { data:stdData } = useQuery({
    queryFn: () => studentDetails(isStudent._id),
    queryKey:["stdDetail"]
  });
  console.log(stdData?.data,"wallet");

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />

        <div className="p-5 lg:p-14 xl:p-16 bg-gray-100 w-full">
          <div className="bg-white shadow-md rounded-md p-6 w-full">
            {/* <div className="flex items-center space-x-4">
              <img
                src={stdData?.data.image}
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
            </div> */}
            <div><img className="h-10 w-full" src="https://static.vecteezy.com/system/resources/previews/001/228/721/non_2x/blue-gradient-with-dynamic-blended-line-design-vector.jpg" alt="" /></div>
            <div className="flex flex-col">
            <img
                src={stdData?.data.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <h2 className="text-2xl font-semibold">{isStudent.username}</h2>
                <div>
                {/* <h3 className="text-lg font-semibold">Contact Information</h3> */}
                <p className="text-gray-500">Email: {isStudent.email}</p>
                <p className="text-gray-500">Phone: +123 456 7890</p>
              </div>
            </div>

            {/* <div className="mt-4 flex justify-between items-center">
            
              <div className="flex items-center">
                <div className="bg-yellow-300 p-4 rounded-full mr-4">
                  💰
                </div>
              
                <div>
                  <p className="text-gray-700 font-semibold">Wallet Balance</p>
                  <p className="text-xl text-yellow-700 font-bold">{`Rs ${
                    stdData?.data?.wallet ?? 0
                  } `}</p>  <WalletHistory walletHistory={stdData?.data.walletHistory}/>
                </div>
              </div>
            </div> */}
          </div>
          <div className="bg-white mt-5 pt-2 ps-3 text-lg"><h1>Class timeline</h1>
            <div className="flex flex-row justify-between mt-3 mx-1 bg-white">
           
            <TimelineApp/>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
