import React from 'react';

const PenjadwalanButton = ({ handleCancel, handleSubmit }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={handleCancel} style={{marginTop: '20px', color: 'var(--danger-danger, #FF382D)', background: 'rgba(255, 56, 45, 0.10)', borderColor: 'rgba(255, 56, 45, 0.10)'}}>Inused</button>
      <button type="button" onClick={handleSubmit} style={{marginTop: '20px'}}>Finished</button>
    </div>
  );
};

export default PenjadwalanButton;
