import React from 'react';
import '../../../styles/ModalSucces.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ModalSucces = ({ isOpen, onClose }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    // Mengatur posisi menjadi fixed untuk memudahkan pemrosesan
    position: 'fixed',
    // Menengahkan modal di tengah vertikal dan horizontal
    top: '50%',
    left: '50%',
    width: '360px',
    transform: 'translate(-50%, -50%)',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    margin: '0 auto',  // Menengahkan gambar secara horizontal
    display: 'block',  // Mengatasi margin: auto yang hanya berfungsi pada elemen block
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content d-flex flex-column gap-1">
        <img src="src/assets/icon/ceklis.png" alt="Ceklis" style={imageStyle} />
        <h5 style={{ textAlign: 'center' }}>BERHASIL!</h5>

        <div  className='d-flex flex-column'>
          <p style={{ textAlign: 'center' }}>Data berhasil di simpan dengan baik</p>
          <div className='d-flex justify-content-center'>
            <button onClick={onClose} id='closeSucces' className='rounded-3'>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSucces;
