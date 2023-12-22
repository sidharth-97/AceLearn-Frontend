import { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import { useMutation, useQuery } from "react-query";
import { applyTutorJobs, getAllJobs } from "../../api/tutorapi";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { RootState } from "../../store";
import { Job } from "../../model/jobModel";
import MySkeleton from "../../components/UI/Skeleton";

interface ApplyJobFormData {
  id: string;
  tutor: string;
  fee: string;
  date: string;
}

const TutorJobs = () => {
  const [time, setTime] = useState("");
  const [tutorJobs, setTutorJobs] = useState([]);
  console.log(time, "this is the time");

  const { isTutor } = useSelector((state:RootState) => state.auth);

  const { data, isLoading, refetch } = useQuery({
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
  const applyjobmutation = useMutation((formData:ApplyJobFormData) => applyTutorJobs(formData));
  console.log(data);

  const handleApply = async (id: string) => {
    const formData:ApplyJobFormData = {
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
          {isLoading ? <MySkeleton /> : <div className="flex justify-center items-center flex-col w-full mt-10">
            <h1 className="text-3xl font-bold mb-4">
              Available Jobs for Tutors
            </h1>
            {tutorJobs.length > 0 ? tutorJobs.map((job: Job) => (
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
            )) : <p>Not available at the moment</p>}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default TutorJobs;
