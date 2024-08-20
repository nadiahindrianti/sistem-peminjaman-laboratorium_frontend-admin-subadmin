import React, { useState } from 'react';
import Header from "../components/Organism/HeaderPeminjaman";
import SearchBar from "../components/Atom/SearchBar";
import TablePeminjaman from "../components/Organism/TablePeminjaman";
import PageSelector from "../components/Organism/PageSelector"; 
import "../styles/KarirPage.css";


const PeminjamanPage = () => {

  return (
    <div className="main-container">
      <Header />
      <div className='create-Karier-button'>
        
      </div>
      <TablePeminjaman />
      <footer className="page-selector-footer">
      
      </footer>
    </div>
  );
};

export default PeminjamanPage;