import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TutorEditProfile } from "../../api/tutorapi";


const EditProfileComponent = ({data}) => {
  const [name, setName] = useState(data.username)
  const [password, Setpassword] = useState("")
  const [cpassword,SetCpassword]=useState("")
    const [mobile, Setmobile] = useState(data.mobile)
    const [bio, Setbio] = useState(data.bio)
    const [fees, Setfees] = useState(data.fees)
    const [subject,Setsubject]=useState(data.subject)

  const { isTutor }  = useSelector((state:any) => state.auth)
  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    const formData = {
      name,
      password,
      mobile,
        email: isTutor.email,
        bio,
        fees,
      subject
    }
    const response = await TutorEditProfile(formData)
    console.log(response);
    
  }
  
  return (
  
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <div>
          <a href="/">
            <h3 className="text-4xl text-center font-bold text-black pb-6 mb-3">Edit Profile</h3>
          </a>
        </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                  name="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Mobile
              </label>
              <div className="flex flex-col items-start">
                <input
                type="mobile"
                value={mobile}
                onChange={(e)=>Setmobile(e.target.value)}
                  name="mobile"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
                  </div>
                  <div className="mt-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Subject
              </label>
              <div className="flex flex-col items-start">
                <input
                type="subject"
                value={subject}
                onChange={(e)=>Setsubject(e.target.value)}
                  name="subject"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
                  </div>
                  <div className="mt-4">
              <label
                htmlFor="fees"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Fees
              </label>
              <div className="flex flex-col items-start">
                <input
                type="fees"
                value={fees}
                onChange={(e)=>Setfees(e.target.value)}
                  name="fees"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
                  </div>
                  <div className="mt-4">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Bio
              </label>
              <div className="flex flex-col items-start">
                <input
                type="bio"
                value={bio}
                onChange={(e)=>Setbio(e.target.value)}
                  name="bio"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                type="password"
                value={password}
                onChange={(e)=>Setpassword(e.target.value)}
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                type="password"
                value={cpassword}
                onChange={(e)=>SetCpassword(e.target.value)}
                  name="password_confirmation"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProfileComponent;
