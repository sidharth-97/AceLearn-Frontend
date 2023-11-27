import React,{useState} from 'react';
import { useQuery } from 'react-query';
import { viewQuestions } from '../../api/tutorapi';
import SolveQuestions from './SolveQuestions';

const StudentQuestionsView = () => {
  const [solve,setSolve]=useState(false)
  const { data: Question, isLoading,refetch } = useQuery({
    queryFn: () => viewQuestions(),
    queryKey:["questionView"]
  })
  console.log(Question, "response");
  

  
  return (
    <>
    <div className={`bg-gray-100 font-sans p-6 ${!solve&&"w-full"}`}>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Student Question</h3>
        <h3 className="text-lg font-semibold">Time left:</h3>
      </div>

      <div className="mb-4 text-gray-700">
        {Question?.data.description}
        {Question?.data.image && <img src={ Question?.data.image} />}
      </div>

      <div className="flex space-x-4">
        <button onClick={() => refetch()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Skip Question
        </button>
        <button onClick={(e)=>setSolve(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Start Solving
        </button>
      </div>
      </div>
      {
        solve && <SolveQuestions question={Question?.data._id } />
      }
</>
  );
};

export default StudentQuestionsView;
