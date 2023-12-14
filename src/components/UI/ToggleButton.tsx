import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ColorToggleButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const isStudentPage = location.pathname === '/student';
console.log(isStudentPage);

  return (
    <label htmlFor="Toggle3" className="inline-flex items-center text-base p-2 rounded-md cursor-pointer dark:text-gray-800">
      <span 
        onClick={() => navigate("/student")}
        className={`px-4 py-2 rounded-l-md  ${isStudentPage ? 'bg-blue-100 text-blue-500'  : ''}`}
      >
        Student Login
      </span>
      <span
        onClick={() => navigate("/tutor")}
        className={`px-4 py-2 rounded-r-md ${!isStudentPage ? 'bg-blue-100 text-blue-500' : ''}`}
      >
        Tutor Login
      </span>
    </label>
  );
}
