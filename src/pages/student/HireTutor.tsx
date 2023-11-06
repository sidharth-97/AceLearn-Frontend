import React,{useState} from "react";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import TextField from "@mui/material/TextField";
import { useQuery,useMutation } from "react-query";
import { postJob } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { ClassNames } from "@emotion/react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";


const RequestTutor = () => {
  const [subject, setSubject] = useState("")
  const [stdclass, setstdClass] = useState("")
  const [timerange, setTimerange] = useState("")
  const [description, setDescription] = useState("")
  const navigate=useNavigate()
  
  const{isStudent}=useSelector((state:any)=>state.auth)

  const postJobMutation = useMutation((formData) => postJob(formData));

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      student: isStudent._id,
      subject: subject,
      timeRange: timerange,
      class: stdclass,
      description:description
    }
    try {
      const response = await postJobMutation.mutateAsync(formData);
      if (response?.status == 200) {
        toast.success("Added Successfully")
        navigate('/student/dashboard')
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />
        <div className="p-8 w-3/4 text-center">
          <h2 className="text-2xl font-bold mb-10 mt-10">Hire a tutor</h2>
          <div className="text-left">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-6 m-4">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select an option
                </label>
                <select value={subject}
                  onChange={(e)=>setSubject(e.target.value)}
                  id="subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option selected>Select your subject</option>
                  <option value="Maths">Maths</option>
                  <option value="Physics">Physics</option>
                  <option value="Web development">Web developed</option>
                </select>

                <div className="mt-2">
                  <label
                    htmlFor="class"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select an option
                  </label>
                  <select value={stdclass} onChange={(e)=>setstdClass(e.target.value)}
                    id="class"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Choose your class</option>
                    <option value="10th">10th</option>
                    <option value="+2">+2</option>
                    <option value="Degree">Degree</option>
                    <option value="+1">+1</option>
                  </select>
                </div>
                <div className="my-3">
                  <select value={timerange} onChange={(e)=>setTimerange(e.target.value)}
                    id="timerange"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Choose your time</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div className="mt-5">
                  <TextField
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    label="Say about your requirement"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    className="w-full mt-4 pt-5"
                  />
                </div>
              </div>
              <div className="flex items-center w-full justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none  items-center"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestTutor;
