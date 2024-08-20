import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineEdit } from 'react-icons/ai';
import '../../styles/TabelKarir.css';
import axios from 'axios';
import { useAuth } from '../Layout/AuthContext';
import Modaleditpeminjaman from '../../components/Molekul/Modal/modaleditpeminjaman';  

const TabelPeminjaman = () => {
  const { token } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPeminjamanId, setSelectedPeminjamanId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getDataPeminjaman = async () => {
    setLoading(true); 
    try {
      const response = await axios.get('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/peminjamans', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = response.data.data;

      data.sort((a, b) => b.peminjaman_id - a.peminjaman_id);

      setTableData(data);
      setFilteredData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getDataPeminjaman();
  }, [token]);

  useEffect(() => {
    if (!tableData) return;

    const results = tableData.filter((row) =>
      (row.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       row.lab?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       row.tanggal_peminjaman?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(results);
  }, [searchTerm, tableData]);

  const handleEditClick = (peminjamanId) => {
    setSelectedPeminjamanId(peminjamanId);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedPeminjamanId(null);
    getDataPeminjaman(); 
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

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        return direction === 'ascending' 
          ? (aValue > bValue ? 1 : -1)
          : (bValue > aValue ? 1 : -1);
      }
    });

    setFilteredData(sortedData);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = { top: 40, left: 25, right: 25, bottom: 25 };

    pdf.setFontSize(16);
    pdf.text("Data Peminjaman", pdf.internal.pageSize.width / 2, margin.top / 2, { align: 'center' });

    const columns = ["Nama User", "Ruang Lab", "Tanggal Peminjaman", "Jam Peminjaman", "Status"];
    const rows = filteredData.map(row => [
      row.user?.full_name || '-',
      row.lab?.name || '-',
      row.tanggal_peminjaman || '-',
      row.jam_peminjaman || '-',
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

    pdf.save('table-peminjaman.pdf');
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search peminjaman"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="download-pdf-button" onClick={downloadPDF}>Download PDF</button>
      <div className="table-container-karier" id="table-to-pdf">
        <table className="data-table-karier">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => sortTable('user.full_name')}>
                Nama User <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('lab.name')}>
                Ruang Lab <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('tanggal_peminjaman')}>
                Tanggal Peminjaman <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('jam_peminjaman')}>
                Jam Peminjaman <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('status')}>
                Status <BiSortAlt2 />
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.peminjaman_id}>
                <td><input type="checkbox" /></td>
                <td>{row.user?.full_name || '-'}</td>
                <td>{row.lab?.name || '-'}</td>
                <td>{row.tanggal_peminjaman || '-'}</td>
                <td>{row.jam_peminjaman || '-'}</td>
                <td>{row.status || '-'}</td>
                <td>
                  <button className="button-edit" onClick={() => handleEditClick(row.peminjaman_id)}>
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
        <Modaleditpeminjaman
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseModal}
          peminjamanId={selectedPeminjamanId}
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

export default TabelPeminjaman;
