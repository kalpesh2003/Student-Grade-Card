export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grades: number[];
}

export interface DashboardStats {
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  highestAverage: number;
}