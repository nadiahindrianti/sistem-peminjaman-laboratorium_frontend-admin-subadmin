import React from 'react';
import "../styles/Database.css";
import Header from "../components/Organism/HeaderFasilitas.jsx";
import NewTabelRuang from '../components/Organism/TabelFasilitas.jsx';


const DataRuang = () => {

  return (
    <div className="main-container">
      <Header />
      <NewTabelRuang />

  </div>


  );
};


export default DataRuang;
