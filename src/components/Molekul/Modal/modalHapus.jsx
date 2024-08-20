import React from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonHapus from "../../Atom/button/buttonHapus";
import ButtonClose from "../../Atom/button/buttonClose";
import Buttonn from "../../Atom/button/button";

const ModalHapus = ({onClick, icons}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true);
    }

    return(
        <>

        <ButtonHapus 
          onClick={handleShow} 
          icon={icons}
        />

        <Modal 
          show={show} 
          onHide={handleClose} 
          style={{
            top: '50%',
            left: '50%',
            width: '350px',
            transform: 'translate(-50%, -50%)'
          }}>

                <header className='d-flex justify-content-between align-items-center mt-1' >
                  <Modal.Title 
                      className='fs-6'>
                      Hapus Data?
                  </Modal.Title>
                  <ButtonClose 
                      onClick={handleClose}/>
                </header>

                <div className='text-center mt-3'>
                  <p
                      style={{fontSize: '12px'}}>
                      Apakah Anda yakin ingin menghapus data ini?<br/>
                      Data yang telah dihapus tidak dapat dikembalikan.
                  </p>
                </div>

                <footer className='d-flex justify-content-center gap-2 mb-1'>
                  <Buttonn 
                      className='text-primary bg-white ' 
                      onClick={handleClose}
                      label="Batal"
                  />
                  <Buttonn 
                      className='bg-button text-white' 
                      onClick={onClick}
                      label="Hapus"
                  />
                </footer>

        </Modal>

        </>
    )
}
export default ModalHapus