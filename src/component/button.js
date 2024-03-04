import React from 'react';

const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`submit-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-7 rounded mt-4`}
    >
      {children}
    </button>
  );
};

export default Button;
