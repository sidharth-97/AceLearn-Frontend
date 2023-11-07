import React from "react";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useMutation, useQuery } from "react-query";
import { bookTutorByPost, viewRequest } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { bookTutor } from "../../api/tutorapi";
import { toast } from "react-toastify";

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

  const acceptTutormutation=useMutation((object)=>bookTutorByPost(object))

  console.log(jobPosting?.data.requests);
  const handleAccept = async (id,date) => {
    const object = {
      tutor: id,
      timing: {
        date:date ,
        student: isStudent._id,
      },
    };

    const response=await acceptTutormutation.mutateAsync(object)
    if (response?.status == 200) {
      toast.success("Booking confirmed")
    }
  }

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
                <p>
                  <strong>Subject:</strong> {jobPosting?.data.subject}
                </p>
                <p>
                  <strong>Class:</strong> {jobPosting?.data.class}
                </p>
                <p>
                  <strong>Time Range:</strong> {jobPosting?.data.timeRange}
                </p>
                <p>
                  <strong>Description:</strong> {jobPosting?.data.description}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>
              {jobPosting?.data.requests.map((tutor) => (
                <div
                  key={tutor._id}
                  className="bg-white rounded-xl shadow-md mb-4 p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-bold">
                      Tutor Name: {tutor.tutor.name}
                    </p>
                    <p>
                      <strong>Fee:</strong> {tutor.fee}
                    </p>
                    <p>
                    <strong>Date: </strong>{new Date(tutor.date).toLocaleDateString()}
<strong> Time: </strong> {new Date(tutor.date).toLocaleTimeString()}                    </p>
                  </div>
                  <button
                    onClick={() => handleAccept(tutor.tutor._id,tutor.date)}
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
