import React from "react";

const DateRangePicker = ({ from, to, onFromChange, onToChange }) => {
  return (
    <div className="flex gap-2">
      <input type="datetime-local" value={from} onChange={e => onFromChange(e.target.value)} />
      <input type="datetime-local" value={to} onChange={e => onToChange(e.target.value)} />
    </div>
  );
};

export default DateRangePicker;
