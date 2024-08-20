import React from 'react';

const EditKonselingButton = ({ handleCancel, handleSubmit }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={handleCancel}>Reject</button>
      <button type="button" onClick={handleSubmit}>Accept</button>
    </div>
  );
};

export default EditKonselingButton;
