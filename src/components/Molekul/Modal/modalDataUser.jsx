import React, { useEffect, useState } from 'react'
import ButtonsDataKonselor from '../../Atom/button/ButtonUser'
import ButtonCloseDataKonselor from '../../Atom/button/buttonClose';
import ModalGagalDataKonselor from './ModalGagalDataKonselor'
import ModalBerhasilDataKonselor from '../../Molekul/Modal/BerhasilUser'
import Artikel from '../list/artikel'
import Karier from '../list/karier'
import Konseling from '../list/konseling'
import Profil from '../../Atom/profil/Profil'
import FormsDataUser from '../form/FormDataUser'
import { useAuth } from '../../Layout/AuthContext'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import '../../../styles/ModalEditDataKonselor.css'
import imageedit from "../../../assets/icon/Edit Square.png"

const ModalDataUser = ({ data }) => {

  const id = data.id
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birthday: '',
    password: '',
  })
  const {token} = useAuth()
  const [checkboxItemsArtikel, setCheckboxItemsArtikel] = useState([]);
  const [checkboxItemsKarier, setCheckboxItemsKarier] = useState([]);
  const [checkboxKonseling, setCheckboxKonseling] = useState([]);
  const [image, setImage] = useState(null)
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseBerhasil = () => setSuccess(false);
  const handleCloseGagal = () => setFailed(false);

  // Fungsi ubah value input
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk mengambil data profil
  const getProfil = async () => {
    try {
      if (token){
        const response = await axios.get(``,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
        const user = response.data;
        setFormData(user.data);
        setImage(user.data.profile_picture);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Fungsi untuk mengambil data artikel
  const getArtikel = async () => {
    try {
      const response = await axios.get(``);
      const dataKonselor = response.data;

      const articles = dataKonselor.article || [];
      const checkboxItemsData = articles.map((article) => ({
        id: article.id, // Menggunakan ID artikel
        title: article.title, // Menggunakan judul
        checked: false, // Menggunakan properti checked
      }));
      setCheckboxItemsArtikel(checkboxItemsData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   // Fungsi untuk mengambil data artikel
   const getKarier = async () => {
    try {
      const response = await axios.get(``);
      const dataKonselor = response.data;

      const karir = dataKonselor.article || [];
      const checkboxItemsData = karir.map((article) => ({
        id: article.id, // Menggunakan ID karir
        title: article.title, // Menggunakan judul
        checked: false, // Menggunakan properti checked
      }));
      setCheckboxItemsKarier(checkboxItemsData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// handle submit
  const handleSubmit = async () => {
    try {
      if (!formData.first_name || 
          !formData.last_name || 
          !formData.email || 
          !formData.birthday || 
          !formData.username || 
          !formData.password) {
        alert('Semua field harus diisi');
        return;
      }
      if (token) {
        const apiFormData = new FormData();
        apiFormData.append('first_name', formData.first_name);
        apiFormData.append('last_name', formData.last_name);
        apiFormData.append('email', formData.email);
        apiFormData.append('birthday', formData.birthday);
        apiFormData.append('username', formData.username);
        apiFormData.append('password', formData.password);
  
        if(image){
          apiFormData.append('profile_picture', image);
        }
  
        const response = await axios.put(
          ``,
          apiFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Check if the request was successful
        if (response.status === 201) {
          setSuccess(true); // Show success modal
        } else {
          setFailed(true); // Show failure modal if the request was not successful
        }
      }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  const handleCheckboxChangeArtikel = (id) => {
    setCheckboxItemsArtikel((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }; 

  
  const handleCheckboxChangeKonseling = (id) => {
    setCheckboxItemsKarier((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }; 

  const handleCheckboxChangeKarir = (id) => {
    setCheckboxKonseling((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }; 


  useEffect(() => {
    getKarier();
    getProfil();
    getArtikel();
  },[]);

    return (
        <>
        <button
          id='btn-editKonselor'
          onClick={handleShow}>
            <img 
              src={imageedit}
              alt="img-editKonselor"/>
        </button>

        <div id='modal-edit-user'>
          <Modal show={show} onHide={handleClose} size='xl'>
              <div className="container-xl my-3" id='modal-edit-user-content'>

                <header id='header-modal-editKonselor'>
                  <p className='m-0 fw-bold fs-5'>Data User</p>
                  <ButtonCloseDataKonselor onClick={handleClose}/>
                </header>

                  <main className='d-flex flex-column'>
                    <Form id='form-editKonselor'>
                        <div className="col-12 d-flex mb-3">
                          <div className='col-8'>
                            <FormsDataUser 
                                first_name={formData.first_name}
                                last_name={formData.last_name}
                                username={formData.username}
                                email={formData.email}
                                birthday={formData.birthday}
                                password={formData.password}
                                onInputChange={handleInputChange}
                              />
                          </div>
                            <div className='col-4'>
                              <Profil src={image}/>
                            </div>
                        </div>
                    </Form>

                      <div className="d-flex justify-content-start col-10 gap-4" >
                        <Artikel 
                          checkboxArtikel={checkboxItemsArtikel} 
                          onCheckBoxChange={handleCheckboxChangeArtikel} />
                        <Karier 
                          checkboxKarier={checkboxItemsKarier} 
                          onCheckBoxChange={handleCheckboxChangeKonseling}/>
                        <Konseling 
                          checkboxKonseling={checkboxKonseling} 
                          onCheckBoxChange={handleCheckboxChangeKarir} /> 
                        </div>

                      <div id='footer-modal-editKonselor'>
                          <ButtonsDataKonselor 
                              className={"bg-white text-primary"}
                              label="Batal" 
                              onClick={handleClose}/>

                          <ButtonsDataKonselor 
                              className={"bg-button"}
                              label="Simpan" 
                              onClick={handleSubmit}/>
                      </div>
                  </main>
                </div>
          </Modal>
          <div>
            <ModalBerhasilDataKonselor 
              label='Data berhasil di simpan dengan baik'
              Berhasil={success} 
              Close={handleCloseBerhasil} />
            <ModalGagalDataKonselor 
              label='Data tidak tersimpan coba lagi'
              Gagal={failed} 
              Close={handleCloseGagal} />
          </div>
        </div>
     </>
    )
}
export default ModalDataUser