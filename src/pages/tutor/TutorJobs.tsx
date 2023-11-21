import { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import { useMutation, useQuery } from "react-query";
import { applyTutorJobs, getAllJobs } from "../../api/tutorapi";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

const TutorJobs = () => {
  const [time, setTime] = useState("");
  const [tutorJobs, setTutorJobs] = useState([]);
  console.log(time, "this is the time");

  const { isTutor } = useSelector((state) => state.auth);

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllJobs(),
    enabled: false,
    queryKey: ["tutorJobs"],
    onSuccess: (data) => {
      if (data) {
        setTutorJobs(data.data);
      }
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const applyjobmutation = useMutation((formData) => applyTutorJobs(formData));
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const handleApply = async (id: {
    id: string;
    tutor: string;
    fee: string;
    date: Date;
  }) => {
    const formData = {
      id: id,
      tutor: isTutor._id,
      fee: isTutor.fee,
      date: time,
    };
    // try {
    await applyjobmutation.mutateAsync(formData);
    toast.success("Applied Successfully")
    // } catch (error) {
    //     console.log(error);
    // }
  };
  const currentDateTime = new Date().toISOString().slice(0, 16); 
  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full">
        <TutorSidebar />
        <div className="w-full">
          <div className="flex justify-center items-center flex-col w-full mt-10">
            <h1 className="text-3xl font-bold mb-4">
              Available Jobs for Tutors
            </h1>
            {tutorJobs.map((job) => (
              <div
                key={job._id}
                className="max-w-2xl bg-gray-100 rounded-xl shadow-md p-6 mb-4 w-full"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Job Details</h2>
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <p>
                      <strong>Subject:</strong> {job.subject}
                    </p>
                    <p>
                      <strong>Class:</strong> {job.class}
                    </p>
                    <p>
                      <strong>Time Range:</strong> {job.timeRange}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-4">
                    Apply for this Job
                  </h2>
                  <button
                    onClick={() => handleApply(job.student)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Apply
                  </button>
                  <input
                    value={time}
                    min={currentDateTime}
                    onChange={(e) => setTime(e.target.value)}
                    type="datetime-local"
                    className="py-2 px-4 border rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorJobs;
