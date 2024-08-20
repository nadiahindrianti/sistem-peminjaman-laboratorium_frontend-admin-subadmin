import React from 'react';

const EditKonselingButton = ({ handleCancel, handleSubmit }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={handleCancel}>Cancel</button>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EditKonselingButton;
