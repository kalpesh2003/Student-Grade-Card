import React from 'react';
import { Student } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateAverage } from '../utils';

interface GraphProps {
  students: Student[];
}

const Graph: React.FC<GraphProps> = ({ students }) => {
  const passedStudents = students.filter((s) => calculateAverage(s.grades) >= 50).length;
  const failedStudents = students.filter((s) => calculateAverage(s.grades) < 50).length;

  const data = [
    { name: 'Passed', value: passedStudents, fill: '#16a34a' },
    { name: 'Failed', value: failedStudents, fill: '#dc2626' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Student Performance Graph</h1>
      <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Number of Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;