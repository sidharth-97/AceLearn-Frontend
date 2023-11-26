import React from "react";

const PostQuestions = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-indigo-800">
          Post a New Question
        </h1>
        <h3 className="text-gray-600">Get expert answers within hours!!!</h3>
      </div>
      <div className="flex flex-col bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            What is your Question
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
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            Select Subject
          </label>
          <div className="grid grid-cols-2 gap-2 w-1/2">
            <button className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100">
              Subject 1
            </button>
            <button className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100">
              Subject 2
            </button>
            <button className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100">
              Subject 3
            </button>
            <button className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100">
              Subject 4
            </button>
            {/* Add more buttons as needed */}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button className="bg-blue-500 w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostQuestions;
