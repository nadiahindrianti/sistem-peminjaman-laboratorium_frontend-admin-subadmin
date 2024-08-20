import React, { useState } from 'react';
import Berhasil from '../../Molekul/Modal/BerhasilPaket';

const Tambah = ({ handleSubmit, id }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = () => {
    // Your existing logic for form submission

    // Set showPopup to true after successful submission
    setShowPopup(true);
  };

  const handleClose = () => {
    // Close the popup
    setShowPopup(false);
  };

  return (
    <>
      <button 
        id={id}
        type="button" 
        className="submit" 
        onClick={handleFormSubmit}>
        Tambah
      </button>
      {/* Render PopupComponent if showPopup is true */}
      {showPopup && <Berhasil handleClose={handleClose} />}
    </>
  );
};

export default Tambah;
