import React from 'react';

const SelectedFilters = ({ selectedValues, clearFilter }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedValues.length > 0 && (
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-bold mr-2"></span>
          {selectedValues.map((value, index) => (
            <div key={index} className="flex items-center space-x-2 border border-gray-300 p-1 rounded">
              <span>{value}</span>
              <button
                className="text-red-500"
                onClick={() => clearFilter(value)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedFilters;
