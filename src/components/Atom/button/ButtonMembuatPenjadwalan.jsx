import React from "react";

const ButtonMembuatPenjadwalan = ({ onClick, label }) => {
  return (
    <button
      className="btn bg-button text-white fw-medium rounded-4"
      onClick={onClick}
      style={{
        background: '#146EFF',
        width: '200px',
        float: 'right',
        marginRight: '20px', // Adjust this value as needed to position the button correctly
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
      }}
    >
      {label}
    </button>
  );
};

export default ButtonMembuatPenjadwalan;
