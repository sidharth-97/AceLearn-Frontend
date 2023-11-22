import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useMutation, useQuery } from 'react-query';
import { addReview, getOldReview } from '../../api/tutorapi';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const navigate=useNavigate()

  const { isStudent } = useSelector((state)=>state.auth)

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const { data:oldReview } = useQuery({
    queryFn: () => getOldReview("653e3a04f4025f5297ebc07e")
  })



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
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Tutor Feedback</h2>

      <div className="mb-4">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={oldReview?.data.rating}
          onChange={handleRatingChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
        <textarea
          className="w-full border text-black rounded-md p-2"
          rows={4}
          value={ oldReview?.data?.description}
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
