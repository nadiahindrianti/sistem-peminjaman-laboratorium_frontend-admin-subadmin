import React, { useState } from 'react';
import Header from "../components/Organism/HeaderPenjadwalan";
import ButtonBuatPenjadwalan from "../components/Molekul/Modal/modalBuatPenjadwalan"
import SearchUser from "../components/Molekul/SearchUser";
import TableSection from "../components/Molekul/TableSection";
import PageSelector from "../components/Organism/PageSelector"; // Ganti nama import menjadi PageSelector
import "../styles/ArtikelContainer.css";


const Penjadwalan = () => {
  
  const [isCreateArticleClicked, setCreateArticleClicked] = useState(false);

  const handleCreateArticleClick = () => {
    setCreateArticleClicked(true);
    // Additional logic or actions when the button is clicked
  };

  return (
    <div className="main-container">
      {/* Gunakan komponen Header */}
      <Header />

      {/* Sub-Containers */}

      {/* Button */}


      <div style={{marginTop: '40px'}}>
      <ButtonBuatPenjadwalan />
      </div>

      <div style={{marginTop: '40px'}}>
      
      </div>

      {/* Table Section */}
      <TableSection />

     
    </div>
  );
};

export default Penjadwalan;
