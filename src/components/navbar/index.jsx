import React from 'react';
import { NavLink } from 'react-router-dom';
// import Button from '../button';

import './index.scss';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="left">Notes Creator</div>

        <ul className="navbar-list center">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              All Notes
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/pinned" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Pinned Notes
            </NavLink>
          </li> */}

          {/* <li className="dropdown-menu">
            Resources
            <div className="submenu">
              <ul>
                <li>
                  <NavLink to="/res1" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    Resources 1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/res2" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    Resources 2
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/res3" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    Resources 3
                  </NavLink>
                </li>
              </ul>
            </div>
          </li> */}
        </ul>

        {/* <ul className="right">
          <li>
            <Button type="outline">Login</Button>
          </li>

          <li>
            <Button>Signup</Button>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
