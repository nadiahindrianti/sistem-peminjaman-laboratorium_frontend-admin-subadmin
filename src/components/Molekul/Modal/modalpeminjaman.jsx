import React, { useState } from 'react';
import SubmitPeminjamanButton from '../../Atom/button/PeminjamanButton';
import CloseButton from '../../Atom/button/Closebutton';
import Modal from 'react-bootstrap/Modal'
import { MdEditSquare } from "react-icons/md";
import '../../../styles/Peminjaman.css';
import ButtonPeminjaman from '../../Atom/button/buttonpeminjaman'


const modalPeminjaman = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [jamPeminjaman, setJamPeminjaman] = useState("");
  const [jamPeminjamanError, setJamPeminjamanError] = useState(false);
  const [waktuKegiatan, setWaktuKegiatan] = useState("");
  const [waktuKegiatanError, setWaktuKegiatanError] = useState(false);
  const [suratRekomendasi, setSuratRekomendasi] = useState('');
  const [suratRekomendasiError, setSuratRekomendasiError] = useState(false);
  const [deskripsiAlasanError, setDeskripsiAlasanError] = useState(false);
  const [deskripsiAlasan, setDeskripsiAlasan] = useState("");
  
  const handleSuratRekomendasi = (e) => {
    const value = e.target.value;
    setSuratRekomendasi(value);
    setSuratRekomendasiError(value === "");
  }

  const handleDeskripsiAlasan = (e) => {
    const value = e.target.value;
    setDeskripsiAlasan(value);
    setDeskripsiAlasanError(value === "");
}

  const handleWaktuKegiatan = (e) => {
    const value = e.target.value;
    setWaktuKegiatan(value);
    setWaktuKegiatanError(value === "");
}
  const handleJamPeminjaman = (e) => {
    const value = e.target.value;
    setJamPeminjaman(value);
    setJamPeminjamanError(value === "");
}


  const handleSubmit = (e) => {
    e.preventDefault();
    const newPeminjaman ={
        id : uuidv4(),
        waktuKegiatan,
        jamPeminjaman,
        suratRekomendasi,
        deskripsiAlasan,
    };

    if (waktuKegiatan === ""){
        setWaktuKegiatanError(true)
    }
    if (jamPeminjaman === ""){
        setJamPeminjamanError(true)
    }
    if (suratRekomendasi === ""){
        setSuratRekomendasiError(true)
    }
    if (deskripsiAlasan === ""){
        setDeskripsiAlasanError(true)
    }

    if (!waktuKegiatan && !jamPeminjaman && !suratRekomendasi && !deksripsiAlasan) {
        return;
    }

    setProductDataPeminjaman([...productDataPeminjaman, newPeminjaman]);
    setWaktuKegiatan("");
    setJamPeminjaman("");
    setSuratRekomendasi("");
    setDeskripsiAlasan("");

    toggleModal();
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
      <ButtonPeminjaman onClick={handleShow} variant="link" label="Peminjaman"></ButtonPeminjaman>
      <div id='modal-tambahPeminjaman'>
          <Modal show={show} onHide={handleClose} size='lg'>
          <div className="modal-Peminjaman">
            <div className="modal-konten-Peminjaman">
              <div className='d-flex justify-content-between align-items-center'>
                <h1>Edit Peminjaman</h1>
                <CloseButton id='btn-closePeminjaman' handleClose={handleClose}/>
              </div>
              <form onSubmit={handleSubmit} className="form-container-Peminjaman">
              <div className="form-group-Peminjaman" style={{gap: '3px'}}>
                  <label htmlFor="waktuKegiatan">Tanggal Peminjaman</label>
                  <div>
                      <input type="date" id="waktuKegiatan" name="waktuKegiatan" style={{width: "150px", height: "35px", borderRadius: '5px'}}/>
                    </div>
              </div>
              <div className="form-group-Peminjaman" style={{gap: '3px'}}>
                  <label htmlFor="jamPeminjaman">Jam Peminjaman</label>
                  <div>
                      <select id="jamPeminjaman" name="jamPeminjaman" style={{width: "230px", height: "35px", borderRadius: '5px'}}>
                          <option value="08:00">09:00 - 11.30</option>
                          <option value="09:00">12:00 - 14.30</option>
                          <option value="10:00">15:00 - 17.30</option>
                      </select>
                  </div>
              </div>
              <div className="form-group-Peminjaman" style={{gap: '3px'}}>
              <div className="col-12 position-relative">
                  <label htmlFor="uploadFile">Surat Rekomendasi</label>
                  <input type="file"value={suratRekomendasi} onChange={handleSuratRekomendasi} style={{height: "35px", borderRadius: '5px'}} className={suratRekomendasiError ? "form-control border border-danger" : "form-control"} id="uploadFile"/>{suratRekomendasiError && <span className='error-message text-danger'>file unread</span>}
                  </div>
              </div>
              <div className="form-group-Peminjaman" style={{gap: '3px'}}>
                  <label htmlFor="deskripsiAlasan">Deksripsi Alasan Peminjaman</label>
                  <textarea value={deskripsiAlasan} onChange={handleDeskripsiAlasan} style={{width: "460px", height: "150px", borderRadius: '5px'}} className={deskripsiAlasanError ? "form-control border border-danger" : "form-control"} id="addDesc" defaultValue={""}/> {deskripsiAlasanError && <span className='error-message text-danger'>Data Kosong</span>}
              </div>

                <SubmitPeminjamanButton handleCancel={handleCancel} onSubmit={handleSubmit} />
                </form>
            </div>
          </div>
        </Modal>
        </div>
     </>
  );
};

export default modalPeminjaman;