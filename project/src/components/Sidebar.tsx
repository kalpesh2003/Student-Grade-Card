import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, CheckCircle, XCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: LineChart, label: 'Graph', path: '/dashboard/graph' },
    { icon: CheckCircle, label: 'Passed Students', path: '/dashboard/passed' },
    { icon: XCircle, label: 'Failed Students', path: '/dashboard/failed' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2 rounded">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold">Grade Manager</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;