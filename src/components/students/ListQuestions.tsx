import { useState,useEffect} from "react";
import { useQuery } from "react-query";
import { viewMyQuestions } from "../../api/studentapi";
import { IoIosArrowBack } from "react-icons/io";

interface ListQuestionProps {
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListQuestions = ({ toggleFunction }:ListQuestionProps) => {
  const [index, setIndex] = useState(0);
  const [mobile, setMobile] = useState(false)
  const [viewSol, setViewSol] = useState(false)
  const [desktop,setDesktop]=useState(false)
console.log(mobile,viewSol,desktop,"877787878");

  const { data } = useQuery({
    queryFn: () => viewMyQuestions(),
    queryKey: ["myQuestions"],
  });
  console.log(data?.data);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true)
    } else {
      setDesktop(true)
    }
  },[])

  return (
    <div className="flex  flex-col items-start w-full p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Homework Help</h1>

      <button
        onClick={(_e) => toggleFunction(false)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Post a new question
      </button>
      <div className="flex w-full">
        {" "}
   { (desktop || !viewSol) && <div className="w-full sm:w-1/2">
          <h1 className="text-2xl font-bold mb-4">My Questions</h1>
          {data?.data.map((ques:{date:string,description:string,tutor:string}, index:number) => (
            <li
              onClick={() => { setIndex(index); setViewSol(true)}}
              key={index}
              className="w-full flex flex-col items-start sm:flex-row justify-between border-b border-gray-300 p-4 sm:items-center"
              >
              <div className="flex">
                   <div className="flex-shrink-0 ml-4">
                <div className="border border-gray-300 p-2 rounded text-center">
                  <span className="text-lg font-bold">
                    {new Date(ques.date).getDate()}
                  </span>
                  <div className="flex gap-1">
                    <span className="text-sm block">
                      {new Date(ques.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-sm block">
                      {new Date(ques.date).getFullYear().toString().substr(-2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 ms-2">
                <h3 className="font-bold text-lg">{ques.description}</h3>
              </div>
              </div>
           

              <div className="flex-shrink-0 ml-4">
                {ques.tutor.length ? (
                  <span className="text-green-500 font-semibold">Answered</span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Not Answered
                  </span>
                )}
              </div>

              {/* Date Section */}
            </li>
          ))}
        </div>}
        {(!mobile || viewSol) && <div className="w-1/2">{data?.data.length ? (<div className="mt-4 w-1/2">
        {mobile&&    <div className="flex items-center ">
          <button
            onClick={()=> setViewSol(false)}
            className=" text-gray-700 font-bold py-2 px-4 rounded"
          >
                <IoIosArrowBack size={32}/>
          </button>
        </div>}
          <h1 className="text-2xl font-bold mb-2">Question</h1>
          <h3 className="text-lg font-semibold mb-2">
            Subject : {data?.data[index].subject}
          </h3>
          { }
          <p className="text-gray-700 mb-4">{data?.data[index].description}</p>

          <div>
            <h1 className="text-2xl font-bold mb-2">Solution</h1>
            {data?.data[index].solution && (
              <>
                <p className="text-gray-700 mb-2">
                  {data?.data[index]?.solution[0]?.text ?? ""}
                </p>
                {data?.data[index]?.solution[0]?.image && (
                  <img
                    src={data?.data[index]?.solution[0]?.image ?? ""}
                    alt="Solution Image"
                    className="mb-4 max-w-full"
                  />
                )}
              </>
            )}
            {data?.data[index].solution && (
              <>
                <p className="text-gray-700 mb-2">
                  {data?.data[index]?.solution[1]?.text ?? ""}
                </p>
                {data?.data[index]?.solution[1]?.image && (
                  <img
                    src={data?.data[index]?.solution[1]?.image ?? ""}
                    alt="Solution Image"
                    className="mb-4 max-w-full"
                  />
                )}
              </>
            )}
          </div>
        </div>) : <h1>Not posted any questions</h1>}</div>}
      </div>
    </div>
  );
};

export default ListQuestions;
