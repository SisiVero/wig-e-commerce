import React, { PureComponent } from 'react'
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Online Order', value: 400 },
  { name: 'Store Order', value: 300 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function Example() {
  return (
    <div>
      <PieChart width={300} height={500}>

      <Pie
        data={data}
        cx={140}
        cy={130}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      </PieChart>
    </div>
  )
}
