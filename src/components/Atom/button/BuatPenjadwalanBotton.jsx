import React from 'react';

const BuatPenjadwalanButton = ({ handleCancel, handleSubmit }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={handleCancel} style={{marginTop: '20px'}}>Batalkan</button>
      <button type="button" onClick={handleSubmit} style={{marginTop: '20px'}}>Submit</button>
    </div>
  );
};

export default BuatPenjadwalanButton;
