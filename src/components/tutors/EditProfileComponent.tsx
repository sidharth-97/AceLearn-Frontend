import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TutorEditProfile } from "../../api/tutorapi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const EditProfileComponent = ({ data }) => {
  const [name, setName] = useState(data.name);
  const [mobile, setMobile] = useState(data.mobile);
  const [bio, setBio] = useState(data.bio);
  const [fees, setFees] = useState(data.fee);
  const [subject, setSubject] = useState(data.subject);
  const [image, setImage] = useState<File | null>(null);
  const { isTutor } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });

  const { password, cpassword } = formData;

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();
  const { status, mutate } = useMutation({
    mutationFn: TutorEditProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["tutorData"], data);
      if(data?.status!==200)toast.error("Blocked by admin")
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tutorData = new FormData();
    console.log(tutorData);
    tutorData.append("_id", isTutor._id);
    tutorData.append("name", name);
    tutorData.append("email", isTutor.email);
    tutorData.append("password", password);
    tutorData.append("mobileNo", mobile);
    tutorData.append("bio", bio);
    tutorData.append("fee", fees);
    tutorData.append("subject", subject);
    if (image) tutorData.append("image", image);
    console.log(tutorData, "after");

    mutate(tutorData);
    
    navigate('/tutor/tutordashboard')
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-D9E2EC">
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <div>
          <a href="/">
            <h3 className="text-4xl text-center font-bold text-black pb-6 mb-3">
              Edit Profile
            </h3>
          </a>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="mobileNo"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Mobile
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="mobileNo"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex flex-col items-start">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                name="image"
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
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
                type="text"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                name="fee"
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
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
                onChange={inputHandler}
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
                onChange={inputHandler}
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
