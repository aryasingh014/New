import React from "react";

const DateRangePicker = ({ from, to, onFromChange, onToChange }) => {
  return (
    <div className="flex space-x-4 items-center">
      <div>
        <label className="block text-sm font-medium">From:</label>
        <input type="datetime-local" value={from} onChange={(e) => onFromChange(e.target.value)} className="border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">To:</label>
        <input type="datetime-local" value={to} onChange={(e) => onToChange(e.target.value)} className="border px-2 py-1 rounded" />
      </div>
    </div>
  );
};

export default DateRangePicker;