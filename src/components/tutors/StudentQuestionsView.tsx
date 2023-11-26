import React from 'react';

const StudentQuestionsView = () => {
  return (
    <div className="bg-gray-100 font-sans p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Student Question</h3>
        <h3 className="text-lg font-semibold">Time left:</h3>
      </div>

      <div className="mb-4 text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sequi esse perferendis sed eaque, necessitatibus officiis. Id quos libero inventore error unde eveniet voluptatum, nostrum a minima illum delectus fugiat?

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus error tempora aut asperiores. Reprehenderit id a, incidunt laudantium, ratione, at error et dicta molestias totam quis qui omnis sed.
      </div>

      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Skip Question
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Start Solving
        </button>
      </div>
    </div>
  );
};

export default StudentQuestionsView;
