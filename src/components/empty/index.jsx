import React from 'react';
import './index.scss';

const EmptyContainer = () => {
  return (
    <div className="empty-container">
      <i className="bx bx-file-find"></i>
      <h2>Nothing To Show Here</h2>
      <p>There are no notes to show please add or search with different title.</p>
    </div>
  );
};

export default EmptyContainer;
