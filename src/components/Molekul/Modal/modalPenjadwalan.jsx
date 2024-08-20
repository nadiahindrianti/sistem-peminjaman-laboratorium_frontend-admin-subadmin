import React, { useEffect, useState } from 'react';
import SubmitEditPenjadwalanButton from '../../Atom/button/PenjadwalanButton';
import CloseButton from '../../Atom/button/Closebutton';
import Modal from 'react-bootstrap/Modal'
import { MdEditSquare } from "react-icons/md";
import '../../../styles/Penjadwalan.css';
import ButtonPenjadwalan from '../../Atom/button/buttonpenjadwalan'
import { useAuth } from '../../Layout/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const modalPenjadwalan = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [waktu_jadwal, setWaktujadwal] = useState("");
  const [waktuJadwalError, setWaktujadwalError] = useState(false);
  const [tanggal_jadwal, setTanggaljadwal] = useState("");
  const [tanggal_jadwalError, setTanggaljadwalError] = useState(false);
  const [name_lab, setNamelab] = useState("");
  const [name_labError, setNamelabError] = useState(false);
  const [name_user, setNameuser] = useState("");
  const [name_userError, setNameuserError] = useState(false);
  const [berita_acara, setBeritaacara] = useState('');
  const [berita_acaraError, setBeritaacaraError] = useState(false);

  
  const handleBeritaAcara = (e) => {
    const value = e.target.value;
    setBeritaacara(value);
    setBeritaacaraError(value === "");
  }

  const handleTanggalJadwal = (e) => {
    const value = e.target.value;
    setTanggaljadwal(value);
    setTanggaljadwalError(value === "");
}
  const handleWaktuJadwal = (e) => {
    const value = e.target.value;
    setWaktujadwal(value);
    setWaktujadwalError(value === "");
}

    const handleNameLab = (e) => {
        const value = e.target.value;
        setNamelab(value);
        setNamelabError(value === "");
}

    const handleNameUser = (e) => {
        const value = e.target.value;
        setNameuser(value);
        setNameuserError(value === "");
}

const [formData, setFormData] = useState({
  jadwal_id: '',
  tanggal_jadwal: '',
  waktu_jadwal: '',
  name_lab: '',
  name_user: '',
  berita_acara: '',
})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tanggal_jadwal || !formData.waktu_jadwal || !formData.name_lab || !formData.name_user || !formData.berita_acara) {
      setModalFailed(true);
      return;
    }

    try {
      const apiFormData = new FormData();
      apiFormData.append('jadwal_id', formData.jadwal_id);
      apiFormData.append('tanggal_jadwal', formData.tanggal_jadwal);
      apiFormData.append('waktu_jadwal', formData.waktu_jadwal);
      apiFormData.append('name_lab', formData.name_lab);
      apiFormData.append('name_user', formData.name_user);
      apiFormData.append('berita_acara', formData.berita_acara);
      

      // Append images only if they exist
      //if (profileImage) {
       // apiFormData.append('logo', profileImage);
      //}

      //if (coverImage) {
        //apiFormData.append('cover', coverImage);
      //}

      // Make API request using Axios with the token
      const response = await axios.put(
        `https://localhost:8000/api/v1/admin/jadwal/${jadwal_id}`, // Use the correct career ID
        apiFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        setModalSuccess(true); // Show success modal
      } else {
        setModalFailed(true); // Show failure modal if the request was not successful
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setModalFailed(true); // Show failure modal if an error occurred
    }
};

  const handleCancel = () => {
    console.log('Canceling action');
    handleClose(); // Jika diperlukan, tambahkan logika lainnya untuk pembatalan
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKeterangan({ ...keterangan, [name]: value });
  };

  return (
    <>
      <ButtonPenjadwalan onClick={handleShow} variant="link" label="Penjadwalan"></ButtonPenjadwalan>
      <div id='modal-editPenjadwalan'>
          <Modal show={show} onHide={handleClose} size='lg'>
          <div className="modal-Penjadwalan">
            <div className="modal-konten-Penjadwalan">
              <div className='d-flex justify-content-between align-items-center'>
                <h1>Edit Penjadwalan</h1>
                <CloseButton id='btn-closePeminjaman' handleClose={handleClose}/>
              </div>
              <form onSubmit={handleSubmit} className="form-container-Peminjaman">
              <div className="form-group-Penjadwalan" style={{gap: '3px'}}>
                  <label htmlFor="tanggalJadwal">Tanggal Jadwal</label>
                  <div>
                      <input type="date" id="tanggalJadwal" name="tanggal_jadwal" style={{width: "150px", height: "35px", borderRadius: '5px'}} onChange={handleTanggalJadwal}/>
                    </div>
              </div>
              <div className="form-group-Penjadwalan" style={{gap: '3px'}}>
                  <label htmlFor="waktuKegiatan">Waktu Kegiatan</label>
                  <div>
                      <select id="waktuKegiatan" name="waktu_jadwal" style={{width: "230px", height: "35px", borderRadius: '5px'}} onChange={handleWaktuJadwal}>
                          <option value="08:00">09:00 - 11.30</option>
                          <option value="09:00">12:00 - 14.30</option>
                          <option value="10:00">15:00 - 17.30</option>
                      </select>
                  </div>
              </div>
              <div className="form-group-Penjadwalan" style={{gap: '3px'}}>
                  <label htmlFor="namaRuang">Nama Ruang</label>
                  <div>
                  <input type="text" id="namaRuang" name="name_lab" placeholder="Nama Ruang" className='np' onChange={handleNameLab}/>
                    </div>
              </div>
              <div className="form-group-Penjadwalan" style={{gap: '3px'}}>
                  <label htmlFor="namaPeminjam">Nama Peminjam</label>
                  <div>
                  <input type="text" id="namaPeminjam" name="name_user" placeholder="Nama Peminjam" className='nk' onChange={handleNameUser} />
                    </div>
              </div>
              <div className="form-group-Penjadwalan" style={{gap: '3px'}}>
              <div className="col-12 position-relative">
                  <label htmlFor="uploadFile">Berita Acara</label>
                  <input type="file"value={berita_acara} onChange={handleBeritaAcara} style={{height: "35px", borderRadius: '5px'}} className={berita_acaraError ? "form-control border border-danger" : "form-control"} id="uploadFile"/>{beritaAcaraError && <span className='error-message text-danger'>file unread</span>}
                  </div>
              </div>
              

                <SubmitEditPenjadwalanButton handleCancel={handleCancel} onSubmit={handleSubmit} />
                </form>
            </div>
          </div>
        </Modal>
        </div>
     </>
  );
};

export default modalPenjadwalan;