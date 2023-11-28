import React from 'react'
import { PieChart,Pie,Legend,Cell } from 'recharts'

const PieCharts = ({data}) => {
    const COLORS = ['#0088FE', '#00C49F'];
  return (
      <div>
          <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Pie>
                                <Legend />
                            </PieChart>
    </div>
  )
}

export default PieCharts