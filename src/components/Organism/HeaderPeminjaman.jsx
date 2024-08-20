import React from 'react';
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";

const HeaderPeminjaman = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h3>Peminjaman</h3>
        <div className="subtitle">
          <div className="icon-home">
          <BsReverseLayoutTextWindowReverse className="icon-home-img" style={{color: 'rgba(51, 132, 178, 0.86)'}}/>
          </div>
          <div className="subtitle-text">/ Peminjaman</div>
        </div>
      </div>
      <div className="header-icons" style={{gap: '20px'}}>
        {/* Notification Icon */}
        
        {/* Profile Image */}

      </div>
    </div>
  );
};

export default HeaderPeminjaman;
