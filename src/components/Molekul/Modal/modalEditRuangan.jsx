import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../styles/EditFasilitasRuangan.css';

const ModalEditRuangan = ({ isOpen, onRequestClose, labId }) => {
  const [lab, setLab] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchLabDetails = async () => {
      if (!labId) {
        console.error('labId is undefined');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/lab/${labId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = response.data.data;
          setLab(data);
          setName(data.name);
          setDescription(data.description);
          if (data.lab_image.length > 0) {
            setImageUrl(data.lab_image[0].image_url);
          }
        } else {
          console.error('Failed to fetch lab details:', response.statusText);
        }
      } catch (err) {
        console.error('Failed to fetch lab details:', err);
      }
    };

    if (isOpen) {
      fetchLabDetails();
    }
  }, [labId, isOpen]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Mengambil file dari event input
  
    if (!file) { 
      console.error('Please select a file to upload.'); 
      return; 
    } 
  
    if (file.size > 10485760) { // 10MB file size limit 
      console.error('File size exceeds the limit of 10MB.'); 
      return; 
    } 
  
    try {
      const formData = new FormData();
      formData.append('file', file); // Menggunakan 'file' sebagai key untuk formData
      const token = localStorage.getItem('token'); // Mengambil token dari localStorage
      const response = await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/cloudinary/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const imageUrl = response.data.data.url;
        setImageUrl(imageUrl); // Update imageUrl dengan URL gambar yang baru
        handleUpdateLab('lab_image', [{ image_url: imageUrl }]);
      } else {
        console.error('Failed to upload image:', response.data.errors);
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
    }
  };

  const handleUpdateLab = async (field, value) => {
    const updatedLab = { ...lab, [field]: value };
    setLab(updatedLab);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/lab/${labId}`, updatedLab, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        console.error('Failed to update lab:', response.statusText);
      }
    } catch (err) {
      console.error('Failed to update lab:', err);
    }
  };

  const handleChange = (field, value) => {
    if (field === 'name') setName(value);
    if (field === 'description') setDescription(value);
    handleUpdateLab(field, value);
  };

  if (!lab) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Ruangan"
      className="Modal_editruangan"
      overlayClassName="ModalOverlay"
    >
      <div className="modalEditRuangan">
        <div className="modalEditRuanganHeader">
          <h2>Edit Data Ruangan</h2>
          <button className="modalEditRuanganCloseButton" onClick={onRequestClose}>&times;</button>
        </div>
        <div className="modalEditRuanganContent">
          <div className="modalEditRuanganFormGroup">
            <label htmlFor="name">Nama Ruangan</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="form-control"
            />
          </div>
          <div className="modalEditRuanganFormGroup">
            <label htmlFor="description">Deskripsi Ruangan</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="form-control"
              rows="4"
            />
          </div>
          <div className="modalEditRuanganFormGroup">
            <label htmlFor="imageUpload">Image Ruangan</label>
            <input type="file" id="imageUpload" onChange={handleImageUpload} className="form-control-file"/>
            {imageUrl && <img src={imageUrl} alt="Lab" className="modalEditRuanganImgPreview" />}
          </div>
        </div>
        <div className="modalEditRuanganActions">
          <button onClick={onRequestClose}>Update</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditRuangan;
