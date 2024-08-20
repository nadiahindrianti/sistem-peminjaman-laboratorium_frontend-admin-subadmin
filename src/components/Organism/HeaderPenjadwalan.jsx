import React from 'react';
import { BsCalendar2Plus } from "react-icons/bs";


const HeaderPenjadwalan = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h3>Penjadwalan</h3>
        <div className="subtitle">
          <div className="icon-home">
            <BsCalendar2Plus className="icon-home-img" style={{color: 'rgba(51, 132, 178, 0.86)'}} />
          </div>
          <div className="subtitle-text">/ Penjadwalan</div>
        </div>
      </div>
      <div className="header-icons" style={{gap: '20px'}}>
        {/* Notification Icon */}
        

        {/* Profile Image */}

      </div>
    </div>
  );
};

export default HeaderPenjadwalan;
