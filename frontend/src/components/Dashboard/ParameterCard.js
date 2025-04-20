import React from 'react';

const ParameterCard = ({ title, value, unit, status, time, warningRange, alarmRange }) => {
  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="capitalize">{title}</h3>
        <span className={`text-sm ${status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
      </div>
      <p className="text-3xl font-semibold">{value} {unit}</p>
      <p className="text-xs text-gray-400">{time}</p>
      <div className="mt-2 text-xs">
        <p>Warning Range: {warningRange}</p>
        <p>Alarm Range: {alarmRange}</p>
      </div>
    </div>
  );
};

export default ParameterCard;
