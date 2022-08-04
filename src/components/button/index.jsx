import React from 'react';
import './index.scss';

const Button = (props) => {
  const { type = 'primary', children, onClick } = props;
  return (
    <button className={`btn ${type}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
