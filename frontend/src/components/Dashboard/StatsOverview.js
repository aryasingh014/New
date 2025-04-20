import React from 'react';

const StatsOverview = ({ connection, parameters, warnings, alarms }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <p>Connection</p>
        <p className={`text-lg font-bold ${connection === 'Online' ? 'text-green-500' : 'text-red-500'}`}>{connection}</p>
        <p className="text-xs text-gray-500">PLC IP: 198.162.0.1:102 (OPCUA)</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p>Parameters</p>
        <p className="text-lg font-bold">{parameters} Normal</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p>Warnings</p>
        <p className="text-lg font-bold">{warnings} Parameters</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p>Alarms</p>
        <p className="text-lg font-bold">{alarms.total} Parameters</p>
        {alarms.unack > 0 && (
          <span className="text-sm bg-red-500 text-white px-2 py-1 rounded mt-1 inline-block">
            {alarms.unack} unacknowledged
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsOverview;
