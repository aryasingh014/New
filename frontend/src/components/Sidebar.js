import React from 'react';
import { FaTachometerAlt, FaHistory, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white border-r p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-8">SAIL PLC</h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="flex items-center gap-2"><FaTachometerAlt /> Dashboard</a></li>
          <li><a href="/parameters" className="flex items-center gap-2"><FaHistory /> Parameters</a></li>
          <li><a href="/history" className="flex items-center gap-2"><FaHistory /> History</a></li>
          <li><a href="/alerts" className="flex items-center gap-2"><FaBell /> Alerts</a></li>
          <li><a href="/settings" className="flex items-center gap-2"><FaCog /> Settings</a></li>
        </ul>
      </div>
      <button className="flex items-center gap-2 text-red-600"><FaSignOutAlt /> Logout</button>
    </div>
  );
};

export default Sidebar;
