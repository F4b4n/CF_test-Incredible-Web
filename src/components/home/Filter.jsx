import React, { useState } from 'react';

function Filter({ filterName, filterOptions, selectedOptions, onToggleOption }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      {filterName}:
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : `Select ${filterName.toLowerCase()}`}
      </button>
      {showDropdown && (
        <ul>
          {filterOptions.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => onToggleOption(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Filter;
