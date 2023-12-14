import React, { useState } from "react";
import { editStudent } from "../../api/studentapi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Student } from "../../model/studentModel";
import { toast } from "react-toastify";
import { loginStudent } from "../../slice/authSlice";

const EditProfile: React.FC<{ data: Student }> = ({ data }) => {
  const [name, setName] = useState(data.username);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [mobile, setMobile] = useState(data.mobile);
  const [toggle, setToggle] = useState(true);
  const [image, setImage] = useState<File | null>(null);
console.log(data,"edit profile componsene");

  const { isStudent } = useSelector((state: RootState) => state.auth);
const dispatch=useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", name);
    formData.append("mobile", mobile);
    if (image) formData.append("image", image);
    const response = await editStudent(formData);
    if (response?.status == 200) {
      dispatch(loginStudent(response.data))
      toast.success("Profile updated")
    } else {
      toast.error("Error")
    }
  };

  const handlePassword = async () => {
    // Handle password change
    const formData = {
      password,
    };
    const response = await editStudent(formData);
    console.log(response);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-2 text-indigo-800">
        Account Setting
      </h1>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-3xl sm:rounded-lg">
        {" "}
        {/* Updated max-width */}
        <div></div>
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
                src={isStudent.image}
                alt="Profile"
                className="w-full h-auto rounded-full"
              />
            </div>
            <div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile
                  </label>
                  <input
                    type="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    name="mobile"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    name="image"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex items-start justify-center mt-4 sm:items-center">
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
          <div>
            <form onSubmit={handlePassword}>
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setCpassword(e.target.value)}
                  name="password_confirmation"
                  className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-2 px-4 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
              </div>
              <div className="flex items-center mt-2">
                <button
                  type="submit"
                  className="inline bg-blue-500 min-w-32 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue whitespace-nowrap"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
