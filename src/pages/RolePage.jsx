import React from 'react'; 
import '../styles/rolepage.css';
import { useNavigate } from 'react-router-dom';

const RolePage = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/register/user');
  };

  const handleAdminClick = () => {
    navigate('/register/admin');
  };

  return (
    <div className="role-container">
      <div className="button-container">
        <button className="button" onClick={handleUserClick}>
          <span className="icon">👤</span> User
        </button>
        <button className="button" onClick={handleAdminClick}>
          <span className="icon">👨‍💼</span> Admin
        </button>
      </div>
    </div>
  );
};

export default RolePage;