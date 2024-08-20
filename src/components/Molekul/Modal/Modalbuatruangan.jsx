import React, { useState } from 'react';
import CloseButton from '../../Atom/button/Closebutton';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../../../styles/FasilitasRuangan.css';


const Modalbuatruangan = ({ isOpen, onRequestClose, onSuccess }) => {
  const [namaRuang, setNamaRuang] = useState('');
  const [imageRuangan, setImageRuangan] = useState(null);
  const [imageRuanganUrl, setImageRuanganUrl] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
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
      setImageRuanganUrl(uploadResponse.data.data.url); 
      setUploadMessage('File berhasil diupload.');
    } catch (err) {
      console.error('Gagal mengupload file:', err);
      setUploadMessage('Gagal mengupload file.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const labData = {
        name: namaRuang,
        lab_image: [
          {
            image_url: imageRuanganUrl // Gunakan URL gambar yang telah diunggah
          }
        ],
        description: deskripsi
      };
      await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/lab', labData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUploadMessage(''); // Reset pesan upload
      setNamaRuang('');
      setImageRuangan(null);
      setImageRuanganUrl('');
      setDeskripsi('');
      onRequestClose();
      onSuccess();
    } catch (err) {
      console.error('Gagal membuat laboratorium:', err);
    }
  };
  

  return (
    <Modal show={isOpen} onHide={onRequestClose} size='lg'>
      <div className="modal-Ruangan">
        <div className="modal-content-Ruangan">
          <div className='d-flex justify-content-between align-items-center'>
            <h1>Buat Ruangan</h1>
            <CloseButton id='btn-closeRuangan' handleClose={onRequestClose} />
          </div>
          <form className="form-container-Ruangan" onSubmit={handleSubmit}>
            <div className="form-group-Ruangan">
              <label>Nama Ruangan</label>
              <input type="text" value={namaRuang} onChange={(e) => setNamaRuang(e.target.value)} required />
            </div>
              <div className="form-group-Ruangan">
                <label>Image</label>
                <input type="file" onChange={handleUploadFile} />
                {uploadMessage && <p>{uploadMessage}</p>}
              </div>
            
            {imageRuanganUrl && (
              <div className="form-group-Ruangan">
                <p>File berhasil diupload.</p>
              </div>
            )}
            <div className="form-group-Ruangan">
              <label>Deskripsi </label>
              <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
            </div>
            
              <div className="button-container">
                <button type="submit">Submit</button>
              </div>
            
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Modalbuatruangan;