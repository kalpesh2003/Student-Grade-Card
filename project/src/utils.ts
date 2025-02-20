import { Student } from './types';

export const calculateAverage = (grades: number[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return Number((sum / grades.length).toFixed(2));
};

export const isPassing = (student: Student): boolean => {
  return calculateAverage(student.grades) >= 50;
};

export const getHighestAverage = (students: Student[]): number => {
  if (students.length === 0) return 0;
  return Math.max(...students.map(student => calculateAverage(student.grades)));
};