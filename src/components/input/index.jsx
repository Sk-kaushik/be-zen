import React from 'react';
import './index.scss';

const InputComponent = (props) => {
  const { type = 'text' } = props;

  if (type === 'text') return <TextInput {...props} />;

  if (type === 'date') return <DateInput {...props} />;

  if (type === 'textarea') return <TextArea {...props} />;

  if (type === 'icon-input') return <IconInput {...props} />;
};

const TextInput = (props) => {
  return <input className="text-input" {...props} />;
};

const IconInput = (props) => {
  return (
    <div className="icon-input">
      <input {...props} />
      {props.icon}
    </div>
  );
};

const TextArea = (props) => {
  return <textarea className="text-area" {...props} />;
};

const DateInput = (props) => {
  const { onChangeHandler } = props;

  return (
    <div className="date-container">
      <input className="date-input" type="date" name="selected_date" onChange={onChangeHandler} />
      <span className="open-button">
        <button type="button">
          <i className="bx bx-calendar"></i>
        </button>
      </span>
    </div>
  );
};

export default InputComponent;
