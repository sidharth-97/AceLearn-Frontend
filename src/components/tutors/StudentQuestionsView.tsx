import  { useState, useEffect,useCallback } from "react";
import { useQuery } from "react-query";
import { viewQuestions } from "../../api/tutorapi";
import SolveQuestions from "./SolveQuestions";
import LoadingButton from "../UI/LoadingButton";



const StudentQuestionsView = ({ toggler }:{toggler:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [solve, setSolve] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); 

  const fetchQuestions = useCallback(() => viewQuestions(), []);

  const { data: questionData, refetch,isLoading } = useQuery({
    queryFn: fetchQuestions,
    queryKey: ["ques"],
    staleTime: 60000, 
    onSuccess: (data) => {
      console.log(data);
      
    }
  });

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !solve) {
    
      toggler(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft, solve, toggler]);


  const handleSkipQuestion = async () => {
    console.log("Before Refetch - isLoading:", isLoading);
    await refetch();
    console.log("After Refetch - isLoading:", isLoading);
    setSolve(false);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className={`bg-gray-100 font-sans p-6 ${!solve && "w-full"}`}>
        <div className={`${!solve && "flex"} justify-between mb-4`}>
          <div className="flex items-center mb-4">
            <button
              onClick={() => toggler(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          </div>
          {(
            <h3 className="text-lg font-semibold">
              Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </h3>
          )}
        </div>

        <div className="mb-4 text-gray-700">
          {questionData?.data.description}
          {questionData?.data.image && <img src={questionData?.data.image} alt="Question" />}
          {!questionData?.data&&<p className="text-lg">No questions available at the moment.</p>}
        </div>

        {(!solve && questionData?.data )&& (
          <div className="flex space-x-4">
           { isLoading? <LoadingButton/>:<button
              onClick={handleSkipQuestion}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Skip Question
            </button>}
            <button
              onClick={() => setSolve(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Solving
            </button>
           
          </div>
        )}
      </div>
      {solve && <SolveQuestions question={questionData?.data._id} />}
    </div>
  );
};

export default StudentQuestionsView;

