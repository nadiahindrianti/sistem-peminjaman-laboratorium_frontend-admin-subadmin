// MainBox.jsx
import React from 'react';
import Headerbox from '../Molekul/Headerbox';
import Bodybox from './Container';



const MainBox = () => {
  return (
    <div className="main-box" style={{ width: '100%' }}>
      <Headerbox />
      <Bodybox />
    </div>
  );
};

export default MainBox;
