/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// ModalNotification.js
import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; 
import imagenotif from '../../../assets/logonotif.png';
import "../../../styles/ModalNotif.css";

const ModalNotification = ({ isOpen, closeModal}) => {
  const customStyles = {
    content: {
      width: '396px',
      height: '414px',
      margin: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Notification Modal"
      style={customStyles}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={closeModal} style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            <FaTimes className="notif-icon"/>
          </button>
        </div>
        <h4 className='title-notif'>Notification</h4>
        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

        <div className='notifikasi-content'>
          <div className= "img-notif">
              <img src={imagenotif} alt="imgnotif" />
          </div>
          <div className='text-notif'>
            <p className='judul-notif'>Pengguna Baru Terdaftar</p>
            <p className='waktu-notif'>19 Jam yang lalu</p>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default ModalNotification;
