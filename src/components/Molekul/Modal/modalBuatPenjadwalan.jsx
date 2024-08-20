import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../styles/Penjadwalan.css';

const Modalbuatpenjadwalan = ({ isOpen, onRequestClose, onCreateSuccess }) => {
  const [nameUser, setNameUser] = useState('');
  const [nameLab, setNameLab] = useState('');
  const [tanggalJadwal, setTanggalJadwal] = useState('');
  const [waktuJadwal, setWaktuJadwal] = useState('09:00');
  const [beritaAcaraImages, setBeritaAcaraImages] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUploadFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const uploadResponse = await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/cloudinary/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      const imageUrl = uploadResponse.data.data.url;
      const newImage = { beritaacara_image_url: imageUrl };
      setBeritaAcaraImages([...beritaAcaraImages, newImage]);
      setUploadMessage('File berhasil diupload.');
    } catch (err) {
      console.error('Failed to upload file:', err);
      setUploadMessage('Gagal mengupload file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const penjadwalanData = {
        name_user: nameUser,
        name_lab: nameLab,
        tanggal_jadwal: tanggalJadwal,
        waktu_jadwal: waktuJadwal,
        beritaacara_image: beritaAcaraImages,
        status: 'notused'
      };
      await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/user/jadwal', penjadwalanData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNameUser('');
      setNameLab('');
      setTanggalJadwal('');
      setWaktuJadwal('09:00');
      setBeritaAcaraImages([]);
      onRequestClose();
      if (onCreateSuccess) onCreateSuccess();  // Panggil callback setelah sukses
    } catch (err) {
      console.error('Failed to create penjadwalan:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal_jadwal" overlayClassName="ModalOverlay_jadwal">
      <div className="ModalHeader_jadwal">
        <h2>Buat Penjadwalan</h2>
        <button className="ModalCloseButton" onClick={onRequestClose}>&times;</button>
      </div>
      <div className="ModalContent_jadwal">
        <form onSubmit={handleSubmit}>
          <div className="form-group_jadwal">
            <label>Nama User</label>
            <input type="text" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required />
          </div>
          <div className="form-group_jadwal">
            <label>Nama Lab</label>
            <input type="text" value={nameLab} onChange={(e) => setNameLab(e.target.value)} required />
          </div>
          <div className="form-group_jadwal">
            <label>Tanggal Jadwal</label>
            <input type="date" value={tanggalJadwal} onChange={(e) => setTanggalJadwal(e.target.value)} required />
          </div>
          <div className="form-group_jadwal">
            <label>Waktu Jadwal</label>
            <select value={waktuJadwal} onChange={(e) => setWaktuJadwal(e.target.value)} required>
              <option value="">Pilih Jam</option>
              <option value="09:00">09:00 - 11:30</option>
              <option value="12:00">12:00 - 14:30</option>
              <option value="15:00">15:00 - 17:30</option>
            </select>
          </div>
          <div className="form-group_jadwal">
            <label>Upload Berita Acara</label>
            <input type="file" onChange={handleUploadFile} />
            {uploadMessage && <p>{uploadMessage}</p>}
          </div>
          <div className="button-container">
                <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Modalbuatpenjadwalan;

