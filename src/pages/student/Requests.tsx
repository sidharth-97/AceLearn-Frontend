import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { jobComplete, viewRequest } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Stripe } from "@stripe/stripe-js";

interface objectData {
  tutor: string;
  fees: number;
  timing: {
    date: [Date];
    student: string;
    fee: number;
  };
}

const stripePromise = loadStripe(
  "pk_test_51OA4ziSEjtBzAge5ZAWJV2Y2EW4v8d0iUt4DHgoUX09VWYiYhsJcUCARpvHLYj5ZLmjxNyCYLyEgJwcQugm6C3YL00VmY9Z4jW"
);
const Requests = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const { isStudent } = useSelector((state: RootState) => state.auth);

  const { data: jobPosting } = useQuery({
    queryFn: () => viewRequest(isStudent._id),
    queryKey: ["jobPosting"],
  });
  console.log(jobPosting,"job posting");

  console.log(jobPosting?.data.requests);
  const handleAccept = async (tutor: any, date: Date) => {
    const object: objectData = {
      tutor: tutor._id,
      fees: tutor.fee,
      timing: {
        date: [date],
        student: isStudent._id,
        fee: tutor.fee,
      },
    };

    if (!stripe) {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    }
    const response = await jobComplete(object);
    console.log(response);
    
    if (response) {
      window.location.href = response.data.url;
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row w-full bg-gray-100">
        <StudentSidebar />
        <div className="flex items-center justify-start mt-8 mb-10 flex-col w-full">
          <h1 className="text-3xl font-bold mt-2 mb-2 text-indigo-800">
            Your Requests
          </h1>
          {jobPosting ? (
            <div className="max-w-6xl w-full bg-white rounded-xl shadow-md p-6">
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
                {jobPosting?.data.requests.map((tutor: any) => (
                  <div
                    key={tutor._id}
                    className="bg-white rounded-xl shadow-md mb-4 p-4 flex justify-between items-center"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 flex justify-center items-center">
                        <img
                          className="rounded-full"
                          src={tutor.tutor.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          Tutor Name: {tutor.tutor.name}
                        </p>
                        <p>
                          <strong>Fee:</strong> {tutor.fee}
                        </p>
                        <p>
                          <strong>Date: </strong>
                          {new Date(tutor.date).toLocaleDateString()}
                          <strong> Time: </strong>{" "}
                          {new Date(tutor.date).toLocaleTimeString()}{" "}
                        </p>
                      </div>
                    </div>
                    {

                       <button
                      onClick={() => handleAccept(tutor.tutor, tutor.date)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Accept
                    </button>
                    }
                   
                  </div>
                ))}
              </div>
            </div>
          ):<p>No Ongoing job post</p>}
        </div>
      </div>
    </div>
  );
};

export default Requests;
// function setStripe(stripeInstance: import("@stripe/stripe-js").Stripe | null) {
//   throw new Error("Function not implemented.");
// }
