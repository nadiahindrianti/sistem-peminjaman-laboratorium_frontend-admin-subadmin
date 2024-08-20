import React, { useState, useEffect } from 'react';
import { LuCalendarDays } from 'react-icons/lu';

const PopUpModal = ({ onfilterApply }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [alldates, setAllDates] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    setStartDate(null);
    setEndDate(null);
    setDefaultDateRange(option);
  };

  const setDefaultDateRange = (option) => {
    const currentDate = new Date();
    let newStartDate = null;
    let newEndDate = null;

    if (option === 'week') {
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      newEndDate = nextWeek.toISOString().split('T')[0];
    } else if (option === 'month') {
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextMonth = new Date(currentDate);
      nextMonth.setDate(currentDate.getDate() + 30);
      newEndDate = nextMonth.toISOString().split('T')[0];
    } else if (option === 'year') {
      newStartDate = currentDate.toISOString().split('T')[0];
      const nextYear = new Date(currentDate);
      nextYear.setDate(currentDate.getDate() + 365);
      newEndDate = nextYear.toISOString().split('T')[0];
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleFilterDate = (event) => {
    event.preventDefault();
    setAllDates(`${startDate} - ${endDate}`);
    handleClose();
    onfilterApply([startDate, endDate]);
  };

  useEffect(() => {
    console.log(alldates);
  }, [alldates]);

  return (
    <>
      <button
        className='d-flex justify-items-center rounded-2'
        style={{ border: '0px solid black', background: 'none', padding: '6px', width: '60px' }}
        onClick={handleShow}
      >
        <LuCalendarDays size={25} />
      </button>

      {show && (
        <div className="modal-overlay-kalender">
          <div className="popup-kalender">
            <div className="popup-header-kalender">
              <h2>Berdasarkan Tanggal</h2>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  style={{ marginLeft: '-165px' }}
                  checked={selectedOption === 'week'}
                  onChange={() => handleCheckboxChange('week')}
                />
                Minggu
              </label>
              <label>
                <input
                  type="checkbox"
                  style={{ marginLeft: '-165px' }}
                  checked={selectedOption === 'month'}
                  onChange={() => handleCheckboxChange('month')}
                />
                Bulan
              </label>
              <label>
                <input
                  type="checkbox"
                  style={{ marginLeft: '-165px' }}
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
      )}
    </>
  );
};

export default PopUpModal;
