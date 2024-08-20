import React, { useState, useEffect } from 'react';
import "../../styles/sidebar.css";
import Router from "../../routes/routers.jsx";
import { TiChevronRight } from "react-icons/ti";
import { TbHomeHeart } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { BsBuildingGear } from "react-icons/bs";
import { BsCalendar2Plus } from "react-icons/bs";
import { BsFillMenuButtonWideFill }  from "react-icons/bs";
import { IoSettingsOutline }  from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/icon/profile 1.jpg'



function layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
  
    logout();
    
    
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Tutup dropdown Database jika membuka dropdown icon
    setIsDatabaseOpen(false);
  };

  const toggleDatabase = () => {
    setIsDatabaseOpen(!isDatabaseOpen);
    // Tutup dropdown icon jika membuka dropdown Database
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Cek jika ada nilai di localStorage
    const storedIsMenuOpen = localStorage.getItem('isMenuOpen');

    if (storedIsMenuOpen === 'true') {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    // Simpan nilai isMenuOpen ke localStorage saat berubah
    localStorage.setItem('isMenuOpen', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    // Tutup dropdown Database saat komponen dimount
    setIsDatabaseOpen(false);

    // Cleanup function to avoid setting state on an unmounted component
    return () => {
      setIsDatabaseOpen(false);
    };
  }, []);

  return (
    <div className="main-layout">
      <div className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="brand">
          <div className="center-info">
            <p className="center-name" onClick={toggleMenu}>
              Centrum Lab <BsFillMenuButtonWideFill />
            </p>
          </div>
        </div>
        <div className={isMenuOpen ? "dropdown-menu" : "hidden"}>
          <div>
            <br/><a className="menu-icon" href="/dashboard"><TbHomeHeart /> Dashboard </a><br/><br/>
            <div className='menu-icon'>
            <a href="/database/user"><GoPeople style={{ marginRight: '8px' }}/>Database Akun</a>
            </div><br/>
            <a href="/database" className='menu-icon' onClick={toggleDatabase}>
               <BsBuildingGear style={{ marginRight: '8px' }} /> Fasilitas <TiChevronRight /><br/>
              <span className={`menu-icon ${isMenuOpen ? 'close' : ''}`}></span>
            </a>
            <div className={isDatabaseOpen ? "dropdown-menu" : "hidden"}>
              <div><a href="/database/ruangan">Ruangan</a></div><br/>
              
            </div>
          </div>
          <div className='menu-icon'>
            <a href="/peminjaman"><BsReverseLayoutTextWindowReverse style={{ marginRight: '8px' }}/>Peminjaman</a>
          </div><br/>
          <div className='menu-icon'>
            <a href="/penjadwalan"><BsCalendar2Plus style={{ marginRight: '8px' }} />Jadwal</a>
          </div><br/><br/><br/><br/><br/><br/><br/><br/>
          <div className='admin-navbar'>
            <a href="/settings">< IoSettingsOutline style={{ marginRight: '8px' }}/>Settings</a>
          </div><br/>
          <div className='menu-icon'>
          <a href="/profile"><img src={Profile} style={{ marginRight: '8px', width: '16x', height: '16px' }} />Admin</a>
          </div><br/>
          <div className='logout'>
          <button className= 'logout-button' onClick={handleLogout}><HiOutlineLogout  style={{ marginRight: '8px', cursor: 'pointer', color: 'rgb(255, 255, 255)'}}/>Keluar</button>
          </div>
        </div>
      </div>
      
{/* Navbar User section */}
        <Router />
      </div>
    
  );
}

export default layout;