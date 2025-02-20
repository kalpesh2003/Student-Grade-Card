import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, UserPlus } from 'lucide-react';
import { Student } from './types';

// Components
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Graph from './pages/Graph';
import PassedStudents from './pages/PassedStudents';
import FailedStudents from './pages/FailedStudents';

// Sample data
const initialStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    rollNumber: '001',
    grades: [85, 90, 95],
  },
  {
    id: '2',
    name: 'Jane Smith',
    rollNumber: '002',
    grades: [45, 30, 40],
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [students, setStudents] = useState<Student[]>(initialStudents);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'teacher@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setName('');
    setShowError(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const handleRemoveStudent = (rollNumber: string) => {
    setStudents(students.filter((s) => s.rollNumber !== rollNumber));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-blue-600 p-3 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Student Grade Manager
            </h2>
            <p className="mt-2 text-gray-600">
              Efficiently manage student grades and performance
            </p>
          </div>

          {showError && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
              Invalid login credentials
            </div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Use email: teacher@example.com and password: password to login
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  students={students}
                  onAddStudent={handleAddStudent}
                  onRemoveStudent={handleRemoveStudent}
                />
              }
            />
            <Route
              path="/dashboard/graph"
              element={<Graph students={students} />}
            />
            <Route
              path="/dashboard/passed"
              element={
                <PassedStudents
                  students={students}
                  onRemoveStudent={handleRemoveStudent}
                />
              }
            />
            <Route
              path="/dashboard/failed"
              element={
                <FailedStudents
                  students={students}
                  onRemoveStudent={handleRemoveStudent}
                />
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;