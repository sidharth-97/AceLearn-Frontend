import React, { useState } from "react";
import { useQuery } from "react-query";
import { submitSolution } from "../../api/tutorapi";
import {toast} from 'react-toastify'

const SolveQuestions = ({ question }) => {
  const [solution, setSolution] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleSolution = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", solution);
    formData.append("image", img);
    formData.append("id",question)
    const result = await submitSolution(formData);
    toast.success("Solution submitted")
    console.log(result);
  };

  return (
    <div className="bg-white font-sans p-6 w-full">
      <div className="text-2xl mb-4 font-semibold">Solve the Question</div>
      <form onSubmit={handleSolution}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            Your set by step solution
          </label>
          <textarea
            onChange={(e) => setSolution(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your question"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            Attach an Image (optional)
          </label>
          <div className="flex items-center justify-between border border-gray-300 rounded p-2">
            <input
              onChange={(e) => setImg(e.target.files?.[0] || null)}
              id="file-upload"
              type="file"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Submit Solution
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolveQuestions;
