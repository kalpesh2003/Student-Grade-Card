import React from 'react';
import { Student } from '../types';
import StudentList from '../components/StudentList';
import { calculateAverage } from '../utils';

interface FailedStudentsProps {
  students: Student[];
  onRemoveStudent: (rollNumber: string) => void;
}

const FailedStudents: React.FC<FailedStudentsProps> = ({ students, onRemoveStudent }) => {
  const failedStudents = students.filter((s) => calculateAverage(s.grades) < 50);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Failed Students</h1>
      <div className="bg-white rounded-lg shadow">
        <StudentList students={failedStudents} onRemoveStudent={onRemoveStudent} />
      </div>
    </div>
  );
};

export default FailedStudents;