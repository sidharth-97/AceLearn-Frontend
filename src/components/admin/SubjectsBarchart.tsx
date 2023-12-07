import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SubjectsBarchart:React.FC<any> = ({ data }) => {
    console.log(data);
    
    const chartdata = Object.entries(data).map(([name, count]) => ({
        name: name || "Unknown",
        uv: count,
      }));
  return (
    <div>
      <BarChart width={730} height={250} data={chartdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default SubjectsBarchart;
