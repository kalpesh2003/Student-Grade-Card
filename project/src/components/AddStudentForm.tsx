import React, { useState } from 'react';
import { Student } from '../types';

interface AddStudentFormProps {
  onAddStudent: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [grades, setGrades] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gradeArray = grades.split(',').map(g => Number(g.trim()));
    
    onAddStudent({
      id: crypto.randomUUID(),
      name,
      rollNumber,
      grades: gradeArray,
    });

    setName('');
    setRollNumber('');
    setGrades('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
          Roll Number
        </label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="grades" className="block text-sm font-medium text-gray-700">
          Grades (comma-separated)
        </label>
        <input
          type="text"
          id="grades"
          value={grades}
          onChange={(e) => setGrades(e.target.value)}
          placeholder="85, 90, 95"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;