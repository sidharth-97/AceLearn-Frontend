import  { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useMutation} from 'react-query';
import { addReview, getOldReview } from '../../api/tutorapi';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

interface review{
  description:string,
  rating:number
}

const FeedbackForm = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [data,setData]=useState<review>()
  const navigate=useNavigate()

  const { isStudent } = useSelector((state:RootState)=>state.auth)

  const handleRatingChange: (newValue: number) => void = (newValue) => {
    setValue(newValue);
  };
  
  console.log(data,"the data from requeest");
  
  

  const handleCommentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // const { data:oldReview } = useQuery({
  //   queryFn: () => getOldReview(data?.id)
  // })

// console.log(oldReview);

  useEffect(() => {
    const localStorageData = local ? JSON.parse(local) : {};
    const data = {
      id: localStorageData.tutor,
      student: isStudent._id,
      rating: value,
      description:comment
    }
    async function review() {
      const response = await getOldReview(data.id)
      setData(response?.data)
      setValue(response?.data.rating)
      setComment(response?.data.description)
    }
    review()
},[])
  const AddTutorReviewMutation=useMutation((data:{ id: string; student: string; rating: number; description: string; })=>addReview(data))

  let local = localStorage.getItem("videocall")
  console.log(local,"this is from local stroge");
  

  const handleSubmit = () => {
    console.log('Rating:', value);
  
    const localStorageData = local ? JSON.parse(local) : {};
    const data = {
      id: localStorageData.tutor,
      student: isStudent._id,
      rating: value,
      description:comment
    }
    AddTutorReviewMutation.mutate(data);

    console.log('Mutation status:', AddTutorReviewMutation.status);

    setValue(0);
    setComment('');
    toast.success("Added Review")
    navigate('/')
    localStorage.removeItem("videocall")
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Tutor Feedback</h2>

      <div className="mb-4">
        <Typography component="legend">Rating</Typography>
        <Rating
  name="simple-controlled"
  value={5}
  onChange={() => handleRatingChange(value)}
/>


      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
        <textarea
          className="w-full border text-black rounded-md p-2"
          rows={value}
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={()=>handleSubmit()}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
