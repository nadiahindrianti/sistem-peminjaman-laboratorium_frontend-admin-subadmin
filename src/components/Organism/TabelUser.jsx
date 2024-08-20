import React, { useState, useEffect } from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import DeleteButton from '../Atom/DeleteButton';
import SearchDataUser from '../../components/Atom/inputan/SearchDataUser';
import { useAuth } from '../Layout/AuthContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import '../../styles/TabelUser.css';

const TabelUser = () => {
  const { token, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const getDataUser = async () => {
    try {
      if (token) {
        const response = await axios.get('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setTableData(data.data);
        console.log(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTableData((prevData) => prevData.filter((user) => user.user_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataUser();
  }, [token]);

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

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = { top: 40, left: 25, right: 25, bottom: 25 };
    const pageHeight = pdf.internal.pageSize.height;

    pdf.setFontSize(16);
    pdf.text("Data User", pdf.internal.pageSize.width / 2, margin.top / 2, { align: 'center' });

    const columns = ["Fullname", "Email", "NIM", "KTM"];
    const rows = filteredData.map(row => [
      row.full_name || '-',
      row.email || '-',
      row.nim_nip || '-',
      row.kartu_identitas_url || '-',
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

    pdf.save('table-user.pdf');
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (e) => {
    setCurrentPage(parseInt(e.target.value, 10));
  };

  const filteredData = tableData.filter((row) => row.full_name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <div id='container-database-tabel-user' style={{ width: '97%' }}>
      <div id='modal-tambah-user' className='d-flex flex-column gap-3' style={{ marginBottom: '20px' }}>
        <div className='d-flex justify-content-end'></div>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search User"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="download-pdf-button" onClick={downloadPDF}>Download PDF</button>
      </div>

      <div className="table-database-akun-user">
        <table className="data-database-akun-user" id='database-akun-user' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th><input type="checkbox" style={{ display: 'none' }} /></th>
              <th onClick={() => sortTable('user_id')}>
                ID User <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('full_name')}>
                Fullname <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('email')}>
                Email <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('nim_nip')}>
                NIM  <BiSortAlt2 />
              </th>
              <th onClick={() => sortTable('kartu_identitas_url')}>
                KTM <BiSortAlt2 />
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.user_id}>
                <td><input type="checkbox" /></td>
                <td>us-{String(row.user_id).padStart(5, '0')}</td>
                <td>{row.full_name}</td>
                <td>{row.email}</td>
                <td>{row.nim_nip}</td>
                <td><img src={row.kartu_identitas_url} alt="Kartu Identitas" style={{ width: '100px', height: 'auto' }} /></td>
                <td>
                  <div style={{ display: "flex" }}>
                    <DeleteButton onConfirmDelete={() => handleDelete(row.user_id)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id='pagination-container-user' className='d-flex justify-content-between'>
          <div id='show-itemsKonselor-user'>
            <span>Show </span>
            <select onChange={handleItemsPerPage} value={itemsPerPage}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
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

export default TabelUser;


