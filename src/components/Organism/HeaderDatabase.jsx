import React from 'react';
import { GoPeople } from "react-icons/go";


const HeaderDatabaseUser = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h3>Database User</h3>
        <div className="subtitle">
          <div className="icon-home">
            <GoPeople className="icon-home-img" style={{color: 'rgba(51, 132, 178, 0.86)'}}/>
          </div>
          <div className="subtitle-text">/ Database User</div>
        </div>
      </div>
      <div className="header-icons" style={{gap: '20px'}}>
        {/* Notification Icon */}
        
        {/* Profile Image */}

      </div>
    </div>
  );
};

export default HeaderDatabaseUser;
