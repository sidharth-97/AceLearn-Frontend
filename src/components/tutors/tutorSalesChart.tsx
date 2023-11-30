import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { tutorSales } from '../../api/tutorapi';
import moment from 'moment';

const TutorSalesChart = () => {
    const { isTutor } = useSelector((state) => state.auth);
    const { data } = useQuery({
        queryFn: () => tutorSales(),
    });

    let dataa = [];
    if (data?.data.length) {
        dataa = data?.data?.map((item) => ({
            name: moment().month(item?._id.month - 1).format('MMMM'), // Convert month number to month name
            pv: item?.totalFee,
        }));
    }

    return (
        <div>
            {data?.data.length && (
                <LineChart width={730} height={250} data={dataa} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    {/* Add more lines if needed */}
                </LineChart>
            )}
        </div>
    );
};

export default TutorSalesChart;
