import React, { useState, useEffect } from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import DeleteButton from '../Atom/DeleteButton';
import ButtonTambahPenjadwalan from "../Atom/button/ButtonMembuatPenjadwalan";
import Modalbuatruangan from '../../components/Molekul/Modal/Modalbuatruangan'; 
import EditFasilitasRuangan from '../Molekul/Modal/modalEditRuangan';
import SearchDataUser from '../../components/Atom/inputan/SearchDataUser';
import { AiOutlineEdit } from 'react-icons/ai';
import { useAuth } from '../Layout/AuthContext';
import axios from 'axios';
import '../../styles/TabelUser.css';

const TabelFasilitas = () => {
  const { token, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const getDataRuangLab = async () => {
    try {
      if (token) {
        const response = await axios.get('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/lab', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const formattedData = data.data.map((lab) => ({
          ...lab,
          lab_image_url: lab.lab_image.length > 0 ? lab.lab_image[0].image_url : '',
        }));
        setTableData(formattedData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleEditClick = (labId) => {
    setSelectedLabId(labId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLabId(null);
    getDataRuangLab(); // Refresh the table data after editing
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    getDataRuangLab(); 
    setIsCreateModalOpen(false); 
  };

  const handleDeleteRuangLab = async (labId) => {
    try {
      await axios.delete(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/lab/${labId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getDataRuangLab(); // Refresh the table data after deleting
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataRuangLab();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (direction === 'ascending') {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });

    setTableData(sortedData);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (e) => {
    setCurrentPage(parseInt(e.target.value, 10));
  };

  const filteredData = tableData.filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <div id='container-database-tabel-user' style={{ width: '97%' }}>
      <div id='modal-tambah-user' className='d-flex flex-column gap-3' style={{ marginBottom: '20px' }}>
      <div className='d-flex justify-content-end align-items-center' id='header-tableKonselor'>
        <div className="d-flex flex-column align-items-end">
        <ButtonTambahPenjadwalan onClick={handleOpenCreateModal} style={{ marginBottom: '10px' }} label="Buat Fasilitas Ruangan" />
          <div className="ikon-search">
          <SearchDataUser value={searchTerm} onChange={handleSearch} style={{ marginTop: '10px', height: '10px' }} />
          </div>
        </div>
      </div>


      </div>

      <div className="table-database-akun-user">
        <table className="data-database-akun-user" id='database-akun-user' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th><input type="checkbox" style={{ display: 'none' }} /></th>
              <th onClick={() => sortTable('lab_id')}>
                ID Ruangan <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('name')}>
                Nama Ruangan <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('lab_image')}>
                Lab Image <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('description')}>
                Deskripsi Ruangan <BiSortAlt2 />
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.lab_id}>
                <td><input type="checkbox" /></td>
                <td>us-{String(row.lab_id).padStart(5, '0')}</td>
                <td>{row.name}</td>
                <td><img src={row.lab_image_url} alt="Lab" style={{ width: '100px', height: 'auto' }} /></td>
                <td>{row.description}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <button className="button-edit-ruangan" onClick={() => handleEditClick(row.lab_id)}>
                      <AiOutlineEdit />
                    </button>
                    <DeleteButton
                      onConfirmDelete={() => handleDeleteRuangLab(row.lab_id)}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditModalOpen && (
          <EditFasilitasRuangan
            isOpen={isEditModalOpen}
            onRequestClose={handleCloseEditModal}
            labId={selectedLabId}
            token={token}
          />
        )}
        {isCreateModalOpen && (
        <Modalbuatruangan
        isOpen={isCreateModalOpen}
        onRequestClose={handleCloseCreateModal}
        onSuccess={handleCreateSuccess} 
      />
      )}
        <div id='pagination-container-user' className='d-flex justify-content-between'>
          <div id='show-itemsKonselor-user'>
            <span>Show </span>
            <select onChange={handleItemsPerPage} value={itemsPerPage}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
            <span> items per page</span>
          </div>
          <div id='pagination-dropdownKonselor-user'>
            <span>Page: </span>
            <select onChange={handlePageChange} value={currentPage}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span> of {totalPages}</span>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-popup">
            <p>Mohon tunggu sebentar, proses loading sedang berjalan...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelFasilitas;
