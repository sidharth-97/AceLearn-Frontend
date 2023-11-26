import React from 'react';

const SolveQuestions = () => {
  return (
    <div className="bg-white font-sans p-6 w-full">
      <div className="text-2xl mb-4 font-semibold">Solve the Question</div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
          Your set by step solution
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your question"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
          Attach an Image (optional)
        </label>
        <div className="flex items-center justify-between border border-gray-300 rounded p-2">
         
          <input id="file-upload" type="file" accept="image/*" />
              </div>
              <button className='mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'>Submit Solution</button>
      </div>
    </div>
  );
};

export default SolveQuestions;
