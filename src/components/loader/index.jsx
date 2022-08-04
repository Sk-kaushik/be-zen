import React from 'react';

import './index.scss';

const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
