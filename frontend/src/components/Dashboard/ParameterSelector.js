import React from 'react';

const ParameterSelector = ({ selected, onSelect }) => {
  const parameters = ['temperature', 'oil level', 'pressure'];

  return (
    <div className="flex gap-4 mb-4">
      {parameters.map((param) => (
        <button
          key={param}
          onClick={() => onSelect(param)}
          className={`px-4 py-2 rounded ${
            selected.includes(param) ? 'bg-blue-800 text-white' : 'bg-gray-200'
          }`}
        >
          {param}
        </button>
      ))}
    </div>
  );
};

export default ParameterSelector;
