import React, { useState } from "react";
import { useQuery } from "react-query";
import { findSubjects } from "../../api/adminapi";
import { addQuestions } from "../../api/studentapi";

const PostQuestions = ({toggleFunction}) => {
  const [subject, setSubject] = useState("")
  const [image, setImage] = useState<File | null>(null);
  const [question,setQuestion]=useState("")

  const { data: subjects } = useQuery({
    queryFn:()=> findSubjects(),
    queryKey:["Subjects"]
  })
  console.log(subjects?.data?.subject);

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     const formData = new FormData()
  formData.append("description", question)
    formData.append("subject", subject)
    formData.append("image",image)
    const result = await addQuestions(formData)
    console.log(result);
    
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    const index = e.target.id;
    const selectedSubject = e.target.textContent;
    setSubject(selectedSubject);
  }

  
  return (
    <div className="container mx-auto p-4 bg-gray-100">
          <div className="mb-8">
      <div className="flex items-center mb-4">
        <button
          onClick={(e)=>toggleFunction(true)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-indigo-800">Post a New Question</h1>
      <h3 className="text-gray-600">Get expert answers within hours!!!</h3>
    </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex flex-col bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            What is your Question
          </label>
          <textarea onChange={(e)=>setQuestion(e.target.value)}
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                name="image"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 bg-slate-200 p-2 rounded-t-md">
            Select Subject
          </label>
          <div className="grid grid-cols-2 gap-2 w-1/2">
            {
              subjects?.data?.subject.map((item, index) => (
                <button onClick={handleButtonClick} id={index} className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100">
                  {console.log(item)}
              {item}
            </button>
              ))
            }
            {/* Add more buttons as needed */}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button type="submit"className="bg-blue-500 w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Post
          </button>
        </div>
      </div></form>
    </div>
  );
};

export default PostQuestions;
