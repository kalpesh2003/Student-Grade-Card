import React, { useState } from 'react';
import { Student, DashboardStats } from '../types';
import { calculateAverage, getHighestAverage } from '../utils';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import { Users, Award, XCircle, TrendingUp, Search } from 'lucide-react';

interface DashboardProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onRemoveStudent: (rollNumber: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  students,
  onAddStudent,
  onRemoveStudent,
}) => {
  const [searchRollNumber, setSearchRollNumber] = useState('');

  const filteredStudents = searchRollNumber
    ? students.filter(student => 
        student.rollNumber.toLowerCase().includes(searchRollNumber.toLowerCase())
      )
    : students;

  const stats: DashboardStats = {
    totalStudents: students.length,
    passedStudents: students.filter((s) => calculateAverage(s.grades) >= 50).length,
    failedStudents: students.filter((s) => calculateAverage(s.grades) < 50).length,
    highestAverage: getHighestAverage(students),
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value={stats.totalStudents}
          color="bg-blue-600"
        />
        <StatCard
          icon={Award}
          label="Passed Students"
          value={stats.passedStudents}
          color="bg-green-600"
        />
        <StatCard
          icon={XCircle}
          label="Failed Students"
          value={stats.failedStudents}
          color="bg-red-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Highest Average"
          value={`${stats.highestAverage}%`}
          color="bg-purple-600"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by Roll Number"
          value={searchRollNumber}
          onChange={(e) => setSearchRollNumber(e.target.value)}
          className="pl-10 pr-3 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <StudentList students={filteredStudents} onRemoveStudent={onRemoveStudent} />
        </div>
        <div>
          <AddStudentForm onAddStudent={onAddStudent} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;