import { useState } from "react";
import { useSelector } from "react-redux";
import { regiterLiveclass } from "../../api/studentapi";
import { RootState } from "../../store";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LiveClassCard = ({ data }: any) => {
  const [stripe, setStripe] = useState<any>();
  const { isStudent } = useSelector((state: RootState) => state.auth)
  const navigate=useNavigate()
  const stripePromise = loadStripe(
    "pk_test_51OA4ziSEjtBzAge5ZAWJV2Y2EW4v8d0iUt4DHgoUX09VWYiYhsJcUCARpvHLYj5ZLmjxNyCYLyEgJwcQugm6C3YL00VmY9Z4jW"
  );
  // const registerMutation = useMutation((dataa: { id: string, student: string }) => regiterLiveclass(dataa))
  // console.log(registerMutation,"register mutation");
  
  const handleClick = async () => {
    (!isStudent)&&navigate("/student/login")
    if (!stripe) {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    }
    const formData = {
      id: data._id,
      student:isStudent._id
    }
    const response = await regiterLiveclass(formData)
    if (response?.status == 200) {
      window.location.href = response.data.url;
      toast.success("Booking successfull")
    } else {
      toast.error("Booking failed")
    }
}
  console.log(data);
  
  

  const handleJoin = () => {
    navigate(`/classroom/${data._id}`)
  }

  return (
    <div className="w-80 bg-white shadow-md rounded-xl transform duration-500 hover:scale-105 hover:shadow-xl">
     {<><div className="flex justify-between p-4 border-b border-gray-200">
        <div className="font-bold">{data.subject}</div>
        <div>{data.duration}</div>
      </div><div className="flex p-4 justify-between">
          <div className="flex items-center">
            <div className="bg-gray-300 w-16 h-16 rounded-full flex-shrink-0 mr-4">
              <img className="rounded-full" src={data?.tutor?.image} alt="" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-lg">{data.topic}</p>
              <p className="text-gray-500">{data.description}</p>
              <p className="text-gray-500">{data.tutor.name}</p>
              <p className="text-gray-500">{new Date(data?.date).toDateString()}</p>
              <p className="text-gray-500">
                Fee : {data.fee > 0 ? data.fee : "Free"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex align-middle justify-center items-center mb-2">
        { data.students.includes(isStudent._id)?<button onClick={handleJoin} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Join
          </button> :<button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Register
          </button>}
        </div></>}
    </div>
  );
};

export default LiveClassCard;
