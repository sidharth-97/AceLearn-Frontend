import React, { useState } from "react";
import { editStudent } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ data }) => {
  const [name, setName] = useState(data.username);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [mobile, setMobile] = useState(data.mobile);
  const [toggle, setToggle] = useState(true);

  const { isStudent } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: name,
      password,
      mobile,
      email: isStudent.email,
    };
    const response = await editStudent(formData);
  };

  const handlePassword = () => {
    // Handle password change
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-D9E2EC">
    <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-3xl sm:rounded-lg"> {/* Updated max-width */}
        <div>
          <h3 className="text-4xl text-center font-bold text-black pb-6 mb-3">
            Account Setting
          </h3>
        </div>
        <div>
          <ul className="flex gap-5 p-5">
            <li onClick={() => setToggle(true)}>Profile</li>
            <li onChange={() => setToggle(false)}>Password</li>
          </ul>
        </div>
        {toggle ? (
          <div className="flex flex-row">
            <div className="w-1/4 mr-6">
            {/* Add your profile picture component or code here */}
            <img
              src="https://placekitten.com/150/150" // Replace with the actual image source
              alt="Profile"
              className="w-full h-auto rounded-full"
            />
          </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile
                  </label>
                  <input
                    type="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    name="mobile"
                    className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    name="password_confirmation"
                    className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  name="password_confirmation"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                </div>
                <button type="submit">Change Password</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
