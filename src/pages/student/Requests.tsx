import React from "react";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { viewRequest } from "../../api/studentapi";
import { useSelector } from "react-redux";

const Requests = () => {
  const { isStudent } = useSelector((state) => state.auth);

  const {
    data: jobPosting,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => viewRequest(isStudent._id),
    queryKey: ["jobPosting"],
  });
  console.log(jobPosting);
  const jobDetails = {
    subject: "Mathematics",
    class: "10th",
    timeRange: "Evening",
  };

  const appliedTutors = [
    {
      _id: "1",
      name: "John Doe",
      experience: "5 years",
    },
    {
      _id: "2",
      name: "Jane Smith",
      experience: "3 years",
    },
    {
      _id: "3",
      name: "Michael Johnson",
      experience: "7 years",
    },
  ];

  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row w-full">
        <StudentSidebar />
        <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-3xl font-bold mb-4">Your Requests</h1>
      <div className="max-w-2xl w-full bg-gray-100 rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Job Posting Details</h2>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <p><strong>Subject:</strong> {jobDetails.subject}</p>
            <p><strong>Class:</strong> {jobDetails.class}</p>
            <p><strong>Time Range:</strong> {jobDetails.timeRange}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>
          {appliedTutors.map((tutor) => (
            <div key={tutor._id} className="bg-white rounded-xl shadow-md mb-4 p-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">Tutor Name: {tutor.name}</p>
                <p><strong>Experience:</strong> {tutor.experience}</p>
              </div>
              <button
                onClick={() => handleAccept(tutor._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Requests;
