import React from 'react';
import Navbar from '../navbar';
import './index.scss';

const Layout = (props) => {
  return (
    <div className="layout-wrapper">
      {!props.hide ? <Navbar /> : null}
      <div className="inner-wrapper">
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
