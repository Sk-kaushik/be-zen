import React from 'react';
import './index.scss';

const Card = (props) => {
  const { pinned = false, title, tagline, body, editForm, created_on, updated_on } = props;

  return (
    <div
      className="card-wrapper"
      onClick={() => {
        editForm(props);
      }}>
      <div className="info">
        <div className="note-header">
          <h1 className="note-title">{title}</h1>
          <div className="action-btns">
            <PinButton pinned={pinned} {...props} />
            <DeleteButton {...props} />
          </div>
        </div>
        <p className="note-tagline">{tagline}</p>
        <p className="note-body">{body}</p>
      </div>
      <div className="footer">
        <div className="time-created">
          <p>
            <span>Created On: </span> {created_on ?? '--'}
          </p>
        </div>

        <div className="time-edited">
          {updated_on && (
            <p>
              <span>Edited On: </span> {updated_on}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

const PinButton = (props) => {
  const { id, pinned, pinNoteHandler } = props;

  const pinNote = (e) => {
    e.stopPropagation();
    if (pinned) return pinNoteHandler(id);
    return pinNoteHandler(id);
  };

  return (
    <span className="pin-btn" onClick={pinNote}>
      {pinned ? (
        <i
          className="bx bxs-pin"
          style={{
            transform: 'rotate(20deg)',
            transition: '0.3s',
          }}></i>
      ) : (
        <i
          className="bx bx-pin"
          style={{
            transform: 'rotate(0deg)',
            transition: '0.3s',
          }}></i>
      )}
    </span>
  );
};

const DeleteButton = (props) => {
  const { id, deleteNoteHandler } = props;

  const deleteNote = (e) => {
    e.stopPropagation();
    deleteNoteHandler(id);
  };
  return (
    <span className="delete-btn" onClick={deleteNote}>
      <i className="bx bx-x"></i>
    </span>
  );
};
