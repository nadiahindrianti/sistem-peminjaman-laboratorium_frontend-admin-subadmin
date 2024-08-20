import React from 'react';
import { BsBuildingGear } from "react-icons/bs";


const HeaderDataRuangan = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h3>Fasilitas</h3>
        <div className="subtitle">
          <div className="icon-home">
            <BsBuildingGear className="icon-home-img" style={{color: 'rgba(51, 132, 178, 0.86)'}}/>
          </div>
          <div className="subtitle-text">/ Ruangan</div>
        </div>
      </div>
      <div className="header-icons" style={{gap: '20px'}}>
        {/* Notification Icon */}
        
        {/* Profile Image */}

      </div>
    </div>
  );
};

export default HeaderDataRuangan;
