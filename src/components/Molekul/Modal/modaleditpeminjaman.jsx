import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/Peminjaman.css';

const Modaleditpeminjaman = ({ isOpen, onRequestClose, peminjamanId }) => {
  const [peminjaman, setPeminjaman] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchPeminjamanDetails = async () => {
      if (!peminjamanId) {
        console.error('peminjamanId is undefined');
        return;
      }
      try {
        const response = await axios.get(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/admin/peminjaman/${peminjamanId}`);
        const data = response.data.data;
        setPeminjaman(data);
        setStatus(data.status);
      } catch (err) {
        console.error('Failed to fetch peminjaman details:', err);
      }
    };

    if (isOpen) {
      fetchPeminjamanDetails();
    }
  }, [peminjamanId, isOpen]);

  const updatePeminjamanStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/peminjaman/${peminjamanId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onRequestClose();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error('Mohon maaf, anda tidak memiliki akses');
      } else {
        console.error('Failed to update peminjaman status:', err);
      }
    }
  };

  const downloadPDF = async () => {
    if (!peminjaman || peminjaman.suratrekomendasi_image.length === 0) return;

    const doc = new jsPDF();
    doc.text('Surat Rekomendasi', 10, 10);

    for (const image of peminjaman.suratrekomendasi_image) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image.suratrekomendasi_image_url;
      
      await new Promise((resolve) => {
        img.onload = () => {
          doc.addImage(img, 'PNG', 10, 20, 180, 0); 
          doc.addPage();
          resolve();
        };
      });
    }

    doc.save('surat_rekomendasi.pdf');
  };

  if (!peminjaman) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Edit Peminjaman"
        className="Modal"
        overlayClassName="ModalOverlay"
      >
        <div className="ModalHeader">
          <h2>Edit Peminjaman</h2>
          <button className="ModalCloseButton" onClick={onRequestClose}>&times;</button>
        </div>
        <div className="ModalContent">
          <p><strong>Nama User:</strong> {peminjaman.user.full_name}</p>
          <p><strong>Ruang Lab:</strong> {peminjaman.lab.name}</p>
          <p><strong>Tanggal Peminjaman:</strong> {peminjaman.tanggal_peminjaman}</p>
          <p><strong>Jam Peminjaman:</strong> {peminjaman.jam_peminjaman}</p>
          <div className="SuratRekomendasi">
            <p><strong>Surat Rekomendasi:</strong></p>
            {peminjaman.suratrekomendasi_image.map((image, index) => (
              <div key={index} className="SuratRekomendasiItem">
                <img src={image.suratrekomendasi_image_url} alt="Surat Rekomendasi" />
                <a href={image.suratrekomendasi_image_url} download>Link Surat Rekomendasi</a>
              </div>
            ))}
          </div>
          <div className="downloadPDF">
            <button className="downloadPDF" onClick={downloadPDF}>Download Surat Rekomendasi</button>
          </div>
          <p><strong>Description:</strong> {peminjaman.description}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
        <div className="ModalActions">
          <button onClick={() => updatePeminjamanStatus('accept')}>Accept</button>
          <button onClick={() => updatePeminjamanStatus('reject')}>Reject</button>
        </div>
      </Modal>
    </>
  );
};

export default Modaleditpeminjaman;
