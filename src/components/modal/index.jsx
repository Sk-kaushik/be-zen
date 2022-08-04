import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button';
import Form from '../form';
import Loader from '../loader';

import './index.scss';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <div className="overlay" style={{ background: props.overlayColor }}></div>
      <div className="modal">
        {props.type === 'form' && <Form {...props} />}
        {props.type === 'loading' && <Loader />}
        {props.type === 'success' && <SuccessModal {...props} />}
        {props.type === 'error' && <ErrorModal {...props} />}
        {props.type === 'confirm' && <ConfirmModal {...props} />}
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;

const SuccessModal = (props) => {
  const { message, modalClickHandler } = props;

  return (
    <div className="modal-success">
      <div className="content">
        <h2>Success</h2>
        <p>{message}</p>
      </div>
      <Button
        onClick={() => {
          modalClickHandler('done');
        }}>
        Done!
      </Button>
    </div>
  );
};

const ErrorModal = (props) => {
  const { message, modalClickHandler } = props;

  return (
    <div className="modal-error">
      <div className="content">
        <h2>Error</h2>
        <p>{message}</p>
      </div>
      <Button type="danger" onClick={modalClickHandler}>
        Cancel
      </Button>
    </div>
  );
};

const ConfirmModal = (props) => {
  const { heading, message, confirmBtnText, cancelHandler, confirmHandler, note, boxHeading } = props;

  return (
    <div className="modal-confirm">
      <div className="modal-header">{boxHeading ?? 'Delete Note'}</div>
      <div className="content">
        <h2>{heading}</h2>
        <p>{message}</p>
      </div>

      <div className="btn-wrapper">
        <Button type="danger" onClick={cancelHandler}>
          Cancel
        </Button>

        <Button
          onClick={() => {
            confirmHandler('delete', note.id);
          }}>
          {confirmBtnText ?? 'Confirm'}
        </Button>
      </div>
    </div>
  );
};
