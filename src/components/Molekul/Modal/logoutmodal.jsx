import React, { useState } from 'react';

const Logout = ({ handleLogout }) => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          display: 'flex',
          width: '200px',
          padding: '20px 16px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '12px',
          border: '2px solid var(--Primary, #5570F1)',
        }}
      >
        Logout
      </button>

      <div
        className={`modal ${show ? 'show' : ''}`}
        style={{
          display: show ? 'inline-flex' : 'none',
          padding: '28px 24px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          borderRadius: '12px',
          background: '#FFF',
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header border-0" style={{ borderBottom: 'none' }}>
              <h5
                className="modal-title"
                style={{
                  fontFamily: 'Raleway-medium/Medium 20',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  textAlign: 'center',
                }}
              >
                Keluar
              </h5>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              Apakah Anda Yakin Ingin Keluar?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  width: '120px',
                  borderRadius: '12px',
                  background: 'white',
                  color: '#5570F1',
                  borderColor: '#5570F1',
                }}
                onClick={handleClose}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  width: '120px',
                  borderRadius: '12px',
                  background: 'var(--primary-gradient-1, linear-gradient(257deg, #FD8BA3 0%, #FF5BCD 100%))',
                }}
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
