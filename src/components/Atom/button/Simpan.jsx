import React, { useState } from 'react';
import Berhasil from '../../Molekul/Modal/BerhasilPaket';

const Simpan = () => {
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
        id='btn-simpanPaket'
        type="button" 
        className="submit" 
        onClick={handleFormSubmit}>
        Simpan
      </button>
      {/* Render PopupComponent if showPopup is true */}
      {showPopup && <Berhasil handleClose={handleClose} />}
    </>
  );
};

export default Simpan;
