import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Modaleditjadwal from "../Molekul/Modal/modaleditpenjadwalan";
import Modalbuatpenjadwalan from "../Molekul/Modal/modalBuatPenjadwalan";
import ButtonTambahPenjadwalan from "../Atom/button/ButtonMembuatPenjadwalan";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineEdit } from 'react-icons/ai';
import '../../styles/TabelKarir.css';
import axios from 'axios';
import { useAuth } from '../Layout/AuthContext';

const TabelSection = () => {
  const { token } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedJadwalId, setSelectedJadwalId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getDataJadwal = async () => {
    setLoading(true); // Show loading popup
    try {
      const response = await axios.get('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/jadwal');
      const data = response.data.data || [];

      setTableData(data);
      setFilteredData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataJadwal();
  }, [token]);

  useEffect(() => {
    const results = tableData.filter((row) =>
      (row.name_user?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (row.name_lab?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (row.tanggal_jadwal?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );
    setFilteredData(results);
  }, [searchTerm, tableData]);

  const handleEditClick = (jadwalId) => {
    setSelectedJadwalId(jadwalId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedJadwalId(null);
    getDataJadwal(); // Refresh the table data after editing
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    getDataJadwal();  // Refresh the table data after creating
    setIsCreateModalOpen(false);
  };

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = key.includes('.') ? key.split('.').reduce((o, i) => o[i], a) : a[key];
      const bValue = key.includes('.') ? key.split('.').reduce((o, i) => o[i], b) : b[key];

      if (direction === 'ascending') {
        return (aValue || '').localeCompare(bValue || '');
      } else {
        return (bValue || '').localeCompare(aValue || '');
      }
    });

    setFilteredData(sortedData);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = { top: 40, left: 25, right: 25, bottom: 25 };
    const pageHeight = pdf.internal.pageSize.height;

    pdf.setFontSize(16);
    pdf.text("Data Jadwal", pdf.internal.pageSize.width / 2, margin.top / 2, { align: 'center' });

    const columns = ["Nama User", "Ruang Lab", "Tanggal Jadwal", "Waktu Jadwal", "Status"];
    const rows = filteredData.map(row => [
      row.name_user || '-',
      row.name_lab || '-',
      row.tanggal_jadwal || '-',
      row.waktu_jadwal || '-',
      row.status || '-'
    ]);

    pdf.autoTable({
      head: [columns],
      body: rows,
      margin: { top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right },
      didDrawPage: (data) => {
        pdf.setFontSize(12);
        pdf.text(`Page ${data.pageNumber}`, pdf.internal.pageSize.width - margin.right, pdf.internal.pageSize.height - margin.bottom / 2, { align: 'right' });
      },
      pageBreak: 'auto',
      theme: 'grid',
      headStyles: {
        fillColor: '#0b4d70'
      }
    });

    pdf.save('table-jadwal.pdf');
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (e) => {
    setCurrentPage(parseInt(e.target.value, 10));
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="body-container-karier">
      <div className="top-container">
        <ButtonTambahPenjadwalan onClick={handleOpenCreateModal} label="Buat Penjadwalan" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search jadwal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="download-pdf-button" onClick={downloadPDF}>Download PDF</button>
      </div>
      <div className="table-container-karier" id="table-to-pdf">
        <table className="data-table-karier">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => sortTable('name_user')}>
                Nama User <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('name_lab')}>
                Ruang Lab <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('tanggal_jadwal')}>
                Tanggal Jadwal <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('waktu_jadwal')}>
                Waktu Jadwal <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('status')}>
                Status <BiSortAlt2 />
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.jadwal_id}>
                <td><input type="checkbox" /></td>
                <td>{row.name_user || '-'}</td>
                <td>{row.name_lab || '-'}</td>
                <td>{row.tanggal_jadwal || '-'}</td>
                <td>{row.waktu_jadwal || '-'}</td>
                <td>{row.status || '-'}</td>
                <td>
                  <button className="button-edit" onClick={() => handleEditClick(row.jadwal_id)}>
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <div className="items-per-page">
            <span>Show</span>
            <select onChange={handleItemsPerPage} value={itemsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>items per page</span>
          </div>
          <div className="pagination-dropdown">
            <span>Page: </span>
            <select onChange={handlePageChange} value={currentPage}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span>of {totalPages}</span>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modaleditjadwal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          jadwalId={selectedJadwalId}
          token={token}
        />
      )}
      {isCreateModalOpen && (
        <Modalbuatpenjadwalan
          isOpen={isCreateModalOpen}
          onRequestClose={handleCloseCreateModal}
          onCreateSuccess={handleCreateSuccess}  // Tambahkan prop ini
          token={token}
        />
      )}
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

export default TabelSection;
