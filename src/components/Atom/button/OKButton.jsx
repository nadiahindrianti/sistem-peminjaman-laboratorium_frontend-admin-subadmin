import React from 'react';
import '../../../styles/Berhasil.css';

const OKButton = ({ handleClick }) => {
  return (
    <button type="button" className="OK-button" onClick={handleClick}>
    OK
  </button>
  );
};

export default OKButton;
