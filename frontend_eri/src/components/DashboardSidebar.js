import React from 'react';
import { NavLink } from 'react-router-dom';

function DashboardSidebar() {
  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium 
     ${isActive ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-blue-700 hover:text-white'}`;

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-8 shadow-xl">
      <div>
        <h2 className="text-xl font-semibold tracking-wide text-gray-200 uppercase mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <NavLink to="/users" className={navLinkStyle}>
            User Management
          </NavLink>
          <NavLink to="/dashboard/about-us" className={navLinkStyle}>
            About Us
          </NavLink>
          <NavLink to="/dashboard/homepage" className={navLinkStyle}>
            Homepage
          </NavLink>
          <NavLink to="/admin" className={navLinkStyle}>
            Manage Cars
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
