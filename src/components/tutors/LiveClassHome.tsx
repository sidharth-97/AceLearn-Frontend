import { useMutation, useQuery } from "react-query";
import { cancelLiveClass, viewLiveClassSchedule } from "../../api/tutorapi";
import { useNavigate } from "react-router-dom";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

const LiveClassHome = ({
  toggle,
}: {
  toggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const { data: schedules } = useQuery({
    queryFn: () => viewLiveClassSchedule(),
    queryKey: ["liveSchedule"],
  });

  console.log(schedules);

  const StartClass = (id: string) => {
    navigate(`/classroom/${id}`);
  };
  const cancleClassMutation = useMutation((data: string) =>
    cancelLiveClass(data)
  );
  async function handleCancel(id: string) {
   cancleClassMutation.mutate(id);
    toast.success("Class cancelled");
  }

  return (
    <div className="flex w-full justify-start gap-16 bg-gray-100 font-sans h-screen">
      <div className="container mx-auto p-4">
        <header className="mb-8 text-center mt-4">
          <h1 className="text-3xl font-bold text-indigo-800">
            Live Class Home
          </h1>
        </header>
        <button
          onClick={() => toggle(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Schedule new class
        </button>
        <div className="flex gap-10">
          <div className="relative border-l border-gray-200 my-5">
            <p className="text-2xl">Your upcomming classes</p>
            {schedules?.data.map(
              (
                schedule: { date: string; topic: string; _id: string },
                index: string
              ) => (
                <li id={index} className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <svg
                      className="w-2.5 h-2.5 text-blue-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>
                  <div className="bg-blue-100 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
                    {" "}
                    <div className="flex gap-3">
                      <div>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                          {"Date : "}
                          {new Date(schedule?.date)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")}{" "}
                        </h3>
                        {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Released on January 13th, 2022</time> */}

                        <p className="mb-4 text-base font-normal text-gray-500">
                          Topic : {schedule.topic}
                        </p>

                        <button
                          className="text-green-600 text-lg me-2"
                          onClick={() => StartClass(schedule._id)}
                        >
                          Start Class
                        </button>
                        {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700">Download ZIP</a> */}
                        <button
                          className="text-red-500"
                          onClick={() => handleCancel(schedule._id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </div>
          <div className="w-1/4">
            <div className="pl-4 mt-10">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  My Stats
                </h2>
                <div>
                  <p className="text-gray-600">This month : </p>
                  <p className="text-lg font-bold mb-2">Live class: 0</p>
                  <p className="text-lg font-bold mb-2">Classes Left: 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClassHome;
