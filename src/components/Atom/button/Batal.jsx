import React from 'react';


const Batal = ({ handleClose, id }) => {
  return (
    <button
      id={id}
      className="batal" 
      onClick={handleClose}>
      Batal
    </button>
  );
};

export default Batal;