import React from 'react';

const DeleteConfirmation = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className="delete-confirmation-modal">
        <p>Apakah Anda yakin ingin menghapus data ini? Data yang telah dihapus tidak dapat dikembalikan.</p>
        <button className="cancel-btn" onClick={onCancel}>Batal</button>
        <button className="confirm-btn" onClick={onConfirm}>Hapus</button>
      </div>
    )
  );
};

export default DeleteConfirmation;
