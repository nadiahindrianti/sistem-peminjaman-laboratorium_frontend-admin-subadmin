import React from 'react';
import "../styles/Database.css";
import Header from "../components/Organism/HeaderDatabase.jsx";
import NewTabelUser from '../components/Organism/TabelUser.jsx';


const DatabaseUser = () => {

  return (
    <div className="main-container">
      <Header />
      <NewTabelUser />

  </div>


  );
};


export default DatabaseUser;
