import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPremiumPrice, setPremiumPrice } from '../../api/adminapi';
import {toast} from 'react-toastify'
import AdminSidebar from './AdminHome';

const Premium = () => {

  const { data } = useQuery({
    queryFn:()=>getPremiumPrice()
  })
  const [tutorPremium, setTutorPremium] = useState(data?.data.tutor);
  const [studentPremium, setStudentPremium] = useState(data?.data.student);
console.log(data?.data);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      student: studentPremium,
      tutor:tutorPremium
    }
    const response = await setPremiumPrice(data)
    if(response?.status==200) toast.success("Premium Price changed")
    console.log('Tutor Premium:', tutorPremium);
    console.log('Student Premium:', studentPremium);
  };

  return (
    <div className='flex'>
      
      <AdminSidebar/>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Set Premium Prices</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tutorPremium" className="block text-sm font-medium text-gray-600">
            Tutor Premium:
          </label>
          <input
            type="number"
            id="tutorPremium"
            className="mt-1 p-2 border rounded-md w-full"
            value={tutorPremium}
            onChange={(e) => setTutorPremium(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="studentPremium" className="block text-sm font-medium text-gray-600">
            Student Premium:
          </label>
          <input
            type="number"
            id="studentPremium"
            className="mt-1 p-2 border rounded-md w-full"
            value={studentPremium}
            onChange={(e) => setStudentPremium(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Set Premium Prices
        </button>
      </form>
    </div>
    </div>
  
  );
};

export default Premium;
