import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const FeedbackForm = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Add your logic to submit the feedback (rating and comment) to the server
    console.log('Rating:', value);
    console.log('Comment:', comment);

    // Clear the form after submission
    setValue(0);
    setComment('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Tutor Feedback</h2>

      <div className="mb-4">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
        <textarea
          className="w-full border rounded-md p-2"
        rows={4}
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
