import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../styles/Peminjaman.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modaleditpenjadwalan = ({ isOpen, onRequestClose, jadwalId }) => {
  const [jadwal, setJadwal] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchJadwalDetails = async () => {
      if (!jadwalId) {
        console.error('jadwalId is undefined');
        return;
      }
      try {
        const response = await axios.get(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/user/jadwal/${jadwalId}`);
        const data = response.data.data;
        setJadwal(data);
        setStatus(data.status);
      } catch (err) {
        console.error('Failed to fetch jadwal details:', err);
      }
    };

    if (isOpen) {
      fetchJadwalDetails();
    }
  }, [jadwalId, isOpen]);

  const updateJadwalStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://sistem-peminjaman-centrumlab.onrender.com/api/v1/user/jadwal/${jadwalId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onRequestClose();
    } catch (err) {
      console.error('Failed to update jadwal status:', err);
    }
  };

  const downloadPDF = async () => {
    if (!peminjaman || peminjaman.beritaacara_image.length === 0) return;

    const doc = new jsPDF();
    doc.text('Berita Acara', 10, 10);

    for (const image of peminjaman.beritaacara_image) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image.beritaacara_image_url;
      
      await new Promise((resolve) => {
        img.onload = () => {
          doc.addImage(img, 'PNG', 10, 20, 180, 0); 
          doc.addPage();
          resolve();
        };
      });
    }

    doc.save('berita_acara.pdf');
  };

  if (!jadwal) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Peminjaman"
      className="Modal"
      overlayClassName="ModalOverlay"
    >
      <div className="ModalHeader">
        <h2>Edit Penjadwalan</h2>
        <button className="ModalCloseButton" onClick={onRequestClose}>&times;</button>
      </div>
      <div className="ModalContent">
        <p><strong>Nama User : </strong> {jadwal.name_user}</p>
        <p><strong>Ruang Lab : </strong> {jadwal.name_lab}</p>
        <p><strong>Tanggal Jadwal : </strong> {jadwal.tanggal_jadwal}</p>
        <p><strong>Waktu Jadwal : </strong> {jadwal.waktu_jadwal}</p>
        <div className="SuratRekomendasi">
          <p><strong>Berita Acara : </strong></p>
          {(jadwal.beritaacara_image || []).map((image, index) => (
            <div key={index} className="SuratRekomendasiItem">
              <img src={image.beritaacara_image_url} alt="Berita Acara" />
              <a href={image.beritaacara_image_url} download>Link Berita Acara</a>
            </div>
          ))}
        </div>
        <div className="downloadPDF">
        <button className="downloadPDF" onClick={downloadPDF}>Download Berita Acara</button>
        </div>
        <p><strong>Status:</strong> {status}</p>
      </div>
      <div className="ModalActions">
        <button onClick={() => updateJadwalStatus('finished')}>Finished</button>
        <button onClick={() => updateJadwalStatus('inused')}>Inused</button>
      </div>
    </Modal>
  );
};

export default Modaleditpenjadwalan;
