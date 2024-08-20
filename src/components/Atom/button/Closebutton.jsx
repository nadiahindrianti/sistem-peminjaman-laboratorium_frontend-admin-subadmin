import React from 'react';
import {AiOutlineClose} from "react-icons/ai";


const CloseButton = ({ handleClose }) => {
  return (
    <button className="close-button" onClick={handleClose}>
      <AiOutlineClose className="close-icon" />
    </button>
  );
};

export default CloseButton;
