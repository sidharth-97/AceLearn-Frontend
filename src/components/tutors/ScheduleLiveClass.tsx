import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { findSubjects } from "../../api/adminapi";
import { scheduleLiveClass } from "../../api/tutorapi";
import  {toast} from 'react-toastify'

const ScheduleLiveClass = () => {
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("30 min");
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState("");
  const [classType, setClassType] = useState("Free"); // Added state for class type

  const { data: subjects } = useQuery({
    queryFn: () => findSubjects(),
    queryKey: ["Subjects"],
  });

    const liveClassMutation=useMutation((data: {
        subject: string;
        date: string;
        topic: string;
        duration: string;
        fee: number;
        description: string;
    })=>scheduleLiveClass(data))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      subject,
      date:time,
      topic,
      duration,
      fee,
      description,
    };
      console.log(formData);
    liveClassMutation.mutate(formData)
    toast.success("Class scheduled")
  };



  return (
    <div className="w-full">
      <div className="container mx-auto p-4 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-indigo-800">
            Schedule Your Live Class
          </h1>
          <h3 className="text-gray-600">Connect with the students !!!</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Pick the time
              </label>
              <input
                type="datetime-local"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Select duration
              </label>
              <div className="grid grid-cols-2 gap-2 w-1/2">
                <button
                  type="button"
                  onClick={() => setDuration("30 min")}
                  className={`p-2 text-sm border rounded focus:outline-none ${
                    duration === "30 min" ? "bg-blue-100" : "border-gray-300"
                  }`}
                >
                  30 min
                </button>
                <button
                  type="button"
                  onClick={() =>setDuration("1 hour")}
                  className={`p-2 text-sm border rounded focus:outline-none ${
                    duration === "1 hour" ? "bg-blue-100" : "border-gray-300"
                  }`}
                >
                  1 hour
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Enter the topic that you cover
              </label>
              <input
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your question"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Select Subject
              </label>
              <div className="grid grid-cols-2 gap-2 w-1/2">
                {subjects?.data?.subject.map((item: string, index: string) => (
                  <button
                    type="button"
                    onClick={() => setSubject(item)}
                    id={index}
                    className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Give a description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your question"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
                Select Class Type
              </label>
              <div className="grid grid-cols-2 gap-2 w-1/2">
                <button
                  type="button"
                  onClick={() =>setClassType("Free")}
                  className={`p-2 text-sm border rounded focus:outline-none ${
                    classType === "Free" ? "bg-blue-100" : "border-gray-300"
                  }`}
                >
                  Free Class
                </button>
                <button
                  type="button"
                  onClick={() =>setClassType("Paid")}
                  className={`p-2 text-sm border rounded focus:outline-none ${
                    classType === "Paid" ? "bg-blue-100" : "border-gray-300"
                  }`}
                >
                  Paid
                </button>{" "}
                {classType == "Paid" && (
                  <>
                    <p>set price</p>
                    <input
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="number"
                      onChange={(e) => setFee(parseInt(e.target.value))}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleLiveClass;
