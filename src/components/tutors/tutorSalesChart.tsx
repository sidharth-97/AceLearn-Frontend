import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { tutorSales } from '../../api/tutorapi';

const TutorSalesChart = () => {
//   const dataa = [
//     { name: 'Jan', pv: 2400, uv: 4000 },
//     { name: 'Feb', pv: 1398, uv: 3000 },
//     { name: 'Mar', pv: 9800, uv: 2000 },
//     { name: 'Apr', pv: 3908, uv: 2780 },
//     { name: 'May', pv: 4800, uv: 1890 },
//     { name: 'Jun', pv: 3800, uv: 2390 },
//     { name: 'Jul', pv: 4300, uv: 3490 },
//     ];

   

    const { isTutor } = useSelector((state) => state.auth)
    
    const { data } = useQuery({
        queryFn:()=>tutorSales()
    })
console.log(data?.data,"tutor sales data");
const dataa = data?.data.map((item) => ({ name: item?._id.month, pv: item?.totalFee }));
if (dataa) {
  console.log(dataa);
}

  return (
    <div>
      <LineChart width={730} height={250} data={dataa} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default TutorSalesChart;
