import React from 'react';
import { Student } from '../types';
import StudentList from '../components/StudentList';
import { calculateAverage } from '../utils';

interface PassedStudentsProps {
  students: Student[];
  onRemoveStudent: (rollNumber: string) => void;
}

const PassedStudents: React.FC<PassedStudentsProps> = ({ students, onRemoveStudent }) => {
  const passedStudents = students.filter((s) => calculateAverage(s.grades) >= 50);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Passed Students</h1>
      <div className="bg-white rounded-lg shadow">
        <StudentList students={passedStudents} onRemoveStudent={onRemoveStudent} />
      </div>
    </div>
  );
};

export default PassedStudents;