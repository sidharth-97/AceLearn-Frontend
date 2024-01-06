import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { tutorSales } from '../../api/tutorapi';
import moment from 'moment';

const TutorSalesChart = () => {
    const { data } = useQuery({
        queryFn: () => tutorSales(),
    });

    let dataa = [];
    if (data?.data.length) {
        dataa = data?.data?.map((item:{totalFee:number,_id:any}) => ({
            name: moment().month(item?._id.month).format('MMMM'), // Convert month number to month name
            pv: item?.totalFee,
        }));
    }
console.log(data,"income report");

    return (
        <div>
            {data?.data.length>0 ? (
                <LineChart width={730} height={250} data={dataa} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    {/* Add more lines if needed */}
                </LineChart>
            ):<p className='ps-5 pb-2'>Not enough data to show graph</p>}
        </div>
    );
};

export default TutorSalesChart;
