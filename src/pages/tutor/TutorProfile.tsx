import { useSelector } from "react-redux";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import "react-calendar/dist/Calendar.css";
import WalletHistory from "../../components/common/WalletHistory";
import TutorSalesChart from "../../components/tutors/tutorSalesChart";
import { useQuery } from "react-query";
import { TutorDetails } from "../../api/tutorapi";
import { FaWallet } from "react-icons/fa";

const TutorProfile = () => {
  const { isTutor } = useSelector((state: any) => state.auth);
  const { data: stdData } = useQuery({
    queryFn: () => TutorDetails(isTutor._id),
    queryKey:["tutorData"]
})
console.log(stdData);

  return (
    <>
      <Navbar />

      <div className="flex">
        <TutorSidebar />

        <div className="w-full p-4 bg-9ED0F5">
        <div className="bg-white shadow-md rounded-md p-6 w-full">
            <div style={{ position: "relative" }}>
              <img
                className="h-20 w-full object-cover"
                src="https://static.vecteezy.com/system/resources/previews/001/228/721/non_2x/blue-gradient-with-dynamic-blended-line-design-vector.jpg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "",
                  left: "08%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={stdData?.data.image}
                  alt={stdData?.data.image}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col mt-16">
                <h2 className="text-2xl font-semibold">{isTutor.name}</h2>
                <div>
                  <p className="text-gray-500">Email: {isTutor.email}</p>
                  <p className="text-gray-500">Phone: {stdData?.data.mobile}</p>
                  <p className="text-gray-500">Subjects: {stdData?.data.subject.join(",")}</p>
                  <p className="text-gray-500">Rating: {stdData?.data.rating?.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-16 flex items-center justify-center space-x-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <FaWallet
                      className="text-blue-500"
                      style={{ fontSize: "2.5rem" }}
                    />
                    <h1 className="text-xl text-yellow-700 font-bold">
                      {`Rs ${stdData?.data?.wallet ?? 0}`}
                    </h1>
                  </div>

                  <WalletHistory walletHistory={stdData?.data.walletHistory} />
                </div>
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

          {/* <div className="flex flex-row h-24 justify-between mt-3 mx-1">
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
          </div> */}
          <div className="bg-white mt-6">
            <h4 className=" text-xl font-semibold ps-3 mt-3 pt-3 pb-3">Income report</h4>
            <TutorSalesChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
