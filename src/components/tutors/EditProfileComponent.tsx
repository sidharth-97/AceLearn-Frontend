import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TutorEditProfile } from "../../api/tutorapi";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Tutor } from "../../model/tutorModel";
import { RootState } from "../../store";
import { loginTutor } from "../../slice/authSlice";

const EditProfileComponent: React.FC<{data:Tutor }> = ({ data }) => {
  const [name, setName] = useState(data.name);
  const [mobile, setMobile] = useState(data.mobile);
  const [bio, setBio] = useState(data.bio);
  const [fees, setFees] = useState(data.fee);
  const [subject, setSubject] = useState<any>(data.subject);
  const [image, setImage] = useState<File | null>(null);
  const [toggle, setToggle] = useState(true);

  const { isTutor } = useSelector((state:RootState) => state.auth);
  const navigate = useNavigate();
const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    password: "",
    cpassword: "",
  });

  const { password, cpassword } = formData;

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: TutorEditProfile,
    onSuccess: (data) => {
      queryClient.setQueryData([], data);
      if (data?.status !== 200) {
        toast.error("Not updated");
      } else {
        dispatch(loginTutor(data.data))
      }
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
    tutorData.append("oldPassword",cpassword)
    tutorData.append("mobile", mobile);
    tutorData.append("bio", bio);
    tutorData.append("fee", fees);
    tutorData.append("subject", subject);
    if (image) {
      tutorData.append("image", image);
    } else {
      tutorData.append("image",isTutor.image)
    }
    console.log(tutorData, "after");

    mutate(tutorData);

    navigate("/tutor/tutordashboard");
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-2 text-indigo-800">
        Account Setting
      </h1>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-3xl sm:rounded-lg">
     
        <div className="text-lg">
          <ul className="flex gap-5 p-5">
          <li
              className={`cursor-pointer ${
                toggle && "border-b-4 border-blue-400"
              }`}
              onClick={() => setToggle(true)}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer ${
                !toggle && "border-b-4 border-blue-400"
              }`}
              onClick={() => setToggle(false)}
            >
              Password
            </li>
        </ul>
      </div>
        {toggle ? (
          <div className="flex flex-col justify-around items-center sm:flex-row">
            <div className="w-1/2 sm:w-1/4 mr-6">
              <img
                src={data.image}  
                alt="Profile"
                className="w-full h-auto rounded-full"
              />
            </div>
            <div>
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
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
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
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
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
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
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
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
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
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
       
          
          <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Edit
              </button>
            </div>
              </form>
            </div>
            </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
                </label>
              <input
                type="password"
                value={password}
                onChange={inputHandler}
                name="password"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={cpassword}
                onChange={inputHandler}
                name="cpassword"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="inline bg-blue-500 min-w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue whitespace-nowrap"
                >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfileComponent;
