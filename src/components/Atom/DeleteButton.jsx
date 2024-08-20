import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import { MdDelete } from 'react-icons/md';

const DeleteButton = ({ onConfirmDelete }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete confirmation logic
    onConfirmDelete(); // Call the provided callback
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <button className="delete-button" onClick={handleDeleteClick}>
        <MdDelete style={{ marginLeft: '10px'}}/>
      </button>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default DeleteButton;