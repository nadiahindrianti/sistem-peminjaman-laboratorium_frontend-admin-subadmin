// PageSelector.jsx
import React from 'react';
import ItemPerPage from '../Molekul/ItemPerPage';
import PageOptions from '../Molekul/PageOption';

const PageSelector = () => {
  return (
    <div className="page-selector-footer">
      {/* <ItemPerPage /> */}
      <PageOptions />
    </div>
  );
};

export default PageSelector;