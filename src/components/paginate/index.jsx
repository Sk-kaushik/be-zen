import React from 'react';
import './index.scss'

const Paginate = (props) => {
  const { paginate, totalPageCount, currentPage } = props;
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="prev-btn"
        onClick={() => {
          paginate('prev');
        }}>
        <i className="bx bx-left-arrow-alt"></i>
        <span> Back</span>{' '}
      </button>
      <p className='page-count'>
        {currentPage} of {totalPageCount}
      </p>
      <button
        disabled={currentPage === totalPageCount}
        className="next-btn"
        onClick={() => {
          paginate('next');
        }}>
        <span>Next</span>
        <i className="bx bx-right-arrow-alt"></i>
      </button>
    </div>
  );
};

export default Paginate;
