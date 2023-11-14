import React, { useState, useEffect } from "react";
import { blockStudent, blockTutor, getTutorData } from "../../api/adminapi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { openModal } from "../../slice/modalSlice";
import Modal from "../UI/Modal";
import Pagination from "../UI/Pagination";
import MySkeleton from "../UI/Skeleton";

interface Tutor {
  _id?: string;
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  subject: Array<string>;
  fee: string;
  image: string;
  bio: string;
  isBlocked: boolean;
}

const Tutors = () => {
  const [tutorData, setTutorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const[activePage,setActivePage]=useState(1)

  const { data: tutorDataResponse,isLoading } = useQuery("tutorData", getTutorData);

  useEffect(() => {
    // Set tutor data when the response is available
    if (tutorDataResponse) {
      setTutorData(tutorDataResponse.data);
    }
  }, [tutorDataResponse]);

 const filteredUsers = tutorData.filter(
    (user: any) =>
      user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  console.log(filteredUsers);
  

  const BlockTutor = async (id: string) => {
    const response = await blockTutor(id);
    if (response?.status == 200) {
      setTutorData((prevData: any) =>
        prevData.map((tutor: any) => {
          if (tutor._id === id) {
            return { ...tutor, isBlocked: !tutor.isBlocked };
          }
          return tutor;
        })
      );
    }
  };

  const dispatch = useDispatch();

  const handleBlockButton = (id) => {
    setSelectedUserId(id);
    dispatch(openModal());
  };

  const itemsPerPage = 2
  const limit=Math.round(filteredUsers.length/2)
  const startIndex = (activePage - 1) * itemsPerPage
  const endIndex = activePage * itemsPerPage
  
  const paginatedTutorData=filteredUsers.slice(startIndex,endIndex)

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      {isLoading && <MySkeleton/>}
      <Modal functionToCall={BlockTutor} id={selectedUserId} />
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Fullname
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.length &&
             paginatedTutorData.map((tutors: Tutor, index) => (
                <tr id={`${index + Date.now()}`}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm  text-gray-800">
                          <img className="w-10" src={tutors.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {tutors.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {tutors.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {tutors.subject}
                  </td>
                  {tutors.isBlocked ? (
                    <>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative text-xs">Blocked</span>
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative text-xs">Not Blocked</span>
                        </span>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    <button
                      className={`bg-transparent border ${
                        tutors.isBlocked
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                      } rounded-md py-2 px-4 hover:bg-${
                        tutors.isBlocked ? "green-500" : "red-500"
                      } hover:text-black transition-all duration-300`}
                      onClick={() => handleBlockButton(tutors._id)}
                    >
                      {" "}
                      {tutors.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-black flex justify-center h-10 w-full p-1 mb-1">
        <Pagination active={activePage} setActive={setActivePage} limit={ limit} />
        </div>
      </div>
    </div>
  );
};

export default Tutors;
