import React, { useState, useEffect } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import {Container, Row, Col } from 'react-bootstrap';
import '../../styles/TableSection.css';

const PageOptions = ({ onPageChange, totalPages, fetchData }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Update the selectedPage when totalPages changes to handle dynamic updates
    if (totalPages < selectedPage) {
      setSelectedPage(totalPages);
    }
  }, [totalPages, selectedPage]);

  const handlePageChange = (newPage) => {
    setSelectedPage(newPage);
    onPageChange(newPage);
    fetchData(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    fetchData(selectedPage, newItemsPerPage); // Fetch data with the new items per page
  };

  const generatePageOptions = () => {
    const options = [10, 20, 30];   
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const generatePageInfo = () => {
    const startIndex = (selectedPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(selectedPage * itemsPerPage, totalPages * itemsPerPage);

    return (
      <div className="page-info">
        <p>
          {startIndex}-{endIndex} items of {totalPages * itemsPerPage} items
        </p>
      </div>
    );
  };

  return (
    <div className="page-options-artikel col-md-12" style={{ gap: "10px"}}>
      
      <div className="page-options-inner">
        
      <div className="items-per-page-select">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {generatePageOptions()}
          </select>
          <p1>Items per page</p1>
        </div>
        {generatePageInfo()}
        <div className="pagination-controls">
        <select
          value={selectedPage}
          onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <p>of {totalPages} pages</p>
        <div className="pagination-buttons">
          <button
            className="pages-prevnext"
            onClick={() => handlePageChange(selectedPage - 1)}
            disabled={selectedPage === 1}
          >
            <GrFormPrevious />
          </button>
          <button
            className="pages-prevnext"
            onClick={() => handlePageChange(selectedPage + 1)}
            disabled={selectedPage === totalPages}
          >
            <GrFormNext />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOptions;
