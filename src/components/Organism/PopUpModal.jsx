import React, { useState, useEffect } from 'react';
import '../../styles/filterKalenderPaket.css'


const PopUpModal = ({ isOpen, togglePopup }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [allArticles] = useState([
    { id: 1, title: 'Article 1', date: '2023-11-15' },
    { id: 2, title: 'Article 2', date: '2023-11-20' },
    { id: 3, title: 'Article 3', date: '2023-11-25' },
    // Add more dummy articles as needed
  ]);

  // Fungsi untuk merefresh data saat ada perubahan pada rentang tanggal
  const refreshData = () => {
    // Implementasikan logika refresh data di sini
    console.log('Merefresh data dengan rentang tanggal:', startDate, endDate);
    // Filter artikel berdasarkan rentang tanggal
    const filteredData = filterArticlesByDate(allArticles, startDate, endDate);
    setFilteredArticles(filteredData);
  };

  const handleCheckboxChange = (option) => {
    // Hanya satu checkbox yang dapat dipilih
    setSelectedOption(option === selectedOption ? null : option);

    // Reset tanggal saat opsi berubah
    setStartDate(null);
    setEndDate(null);

    // Set rentang waktu otomatis
    setDefaultDateRange(option);
  };

  const handleDateChange = (event, type) => {
    const value = event.target.value;

    if (type === 'start') {
      setStartDate(value);
    } else if (type === 'end') {
      setEndDate(value);
    }
  };

  const handleFilterDate = () => {
    // Logika untuk menerapkan filter tanggal
    console.log('Menerapkan filter dengan rentang tanggal:', startDate, endDate);
    // TODO: Implement logic to apply date filter
    refreshData();
  };

  const handleClose = () => {
    // Logika untuk menutup popup
    togglePopup();
  };

  // Fungsi untuk mengatur rentang tanggal sesuai dengan opsi yang dipilih
  const setDefaultDateRange = (option) => {
    const currentDate = new Date();
    let newStartDate = null;
    let newEndDate = null;

    if (option === 'week') {
      // Set rentang minggu dari hari ini hingga 7 hari ke depan
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      newEndDate = nextWeek.toISOString().split('T')[0];
    } else if (option === 'month') {
      // Set rentang bulan dari hari ini hingga 30 hari ke depan
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextMonth = new Date(currentDate);
      nextMonth.setDate(currentDate.getDate() + 30);
      newEndDate = nextMonth.toISOString().split('T')[0];
    } else if (option === 'year') {
      // Set rentang tahun dari hari ini hingga 365 hari ke depan
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextYear = new Date(currentDate);
      nextYear.setDate(currentDate.getDate() + 365);
      newEndDate = nextYear.toISOString().split('T')[0];
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Memuat ulang data saat ada perubahan rentang tanggal
    refreshData();
  };

  // Menggunakan useEffect untuk memuat ulang data saat ada perubahan pada startDate atau endDate
  useEffect(() => {
    refreshData();
  }, [startDate, endDate]);

  // Fungsi untuk filter artikel berdasarkan rentang tanggal
  const filterArticlesByDate = (articles, start, end) => {
    return articles.filter((article) => {
      const articleDate = new Date(article.date);
      return (
        (!start || articleDate >= new Date(start)) &&
        (!end || articleDate <= new Date(end))
      );
    });
  };

  return (
    isOpen && (
      <div className="modal-overlay-kalender">
      <div className="popup-kalender">
      <div className="popup-header-kalender">
          <h2>Berdasarkan Tanggal</h2>
      </div>
      <div>
          {/* Checkbox untuk memilih rentang tanggal */}
          <label>
          <input
              type="checkbox"
              style={{marginLeft: '-165px'}}
              checked={selectedOption === 'week'}
              onChange={() => handleCheckboxChange('week')}
          />
          Minggu
          </label>
          <label>
          <input
              type="checkbox"
              style={{marginLeft: '-165px'}}
              checked={selectedOption === 'month'}
              onChange={() => handleCheckboxChange('month')}
          />
          Bulan
          </label>
          <label>
          <input
              type="checkbox"
              style={{marginLeft: '-165px'}}
              checked={selectedOption === 'year'}
              onChange={() => handleCheckboxChange('year')}
          />
          Tahun
          </label>
      </div>
      {selectedOption && (
          <div>
          <label>Dari </label>
          <input
              type="date"
              name='startDate'
              value={startDate}
              onChange={handleDateChange}
          />
          <label>Sampai </label>
          <input
              type="date"
              name='endDate'
              value={endDate}
              onChange={handleDateChange}
          />
          </div>
      )}
      <button className="filter-date-button-kalender" onClick={handleFilterDate}>
          Filter
      </button>
      </div>
  </div>
    )
  );
};

export default PopUpModal;
