import React, { useState, useEffect, useReducer } from 'react';
import './index.scss';

import Card from '../../components/card';
import InputComponent from '../../components/input';
import Button from '../../components/button';
import Modal from '../../components/modal';
import EmptyContainer from '../../components/empty';

import { findById, orderByPinned } from '../../helper/helper-method';
import { addNoteToDb, deleteNoteFromDb, getAllNotesFromDb, updateNoteInDb, searchNoteInDb, getPinnedNotesFromDb } from '../../helper/firebase-helper';

const MAX_NOTES_TO_SHOW = 6;

const Notes = (props) => {
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [listSize, setListSize] = useState(-1);

  const [formData, dispatchForm] = useReducer(noteReducer, { title: '', tagline: '', body: '', pinned: false });

  useEffect(() => {
    getAllNotes();

    window.addEventListener('keydown', exitOnEsc, false);

    return () => {
      window.removeEventListener('keydown', exitOnEsc, false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  useEffect(() => {
    console.log('render again');
  }, []);

  const exitOnEsc = (event) => {
    if (event.key === 'Escape') {
      setShowModal(null);
      closeForm();
    }
  };

  const getAllNotes = (operation) => {
    setLoading(true);

    setShowModal(null);
    setShowForm(false);
    dispatchForm({ type: 'reset' });

    if (props.type === 'pinned') {
      getPinnedNotesFromDb().then((res) => {
        setLoading(false);
        if (res.length > 0) {
          const orderedList = orderByPinned(res);
          setAllNotes(orderedList);
        } else {
          setAllNotes([]);
        }
      });
    } else {
      getAllNotesFromDb(MAX_NOTES_TO_SHOW, operation).then((res) => {
        setLoading(false);
        if (res.data.length > 0) {
          const orderedList = orderByPinned(res.data);
          setAllNotes(orderedList);
          setListSize(res.size);
        } else {
          setAllNotes([]);
        }
      });
    }
  };

  const saveNote = () => {
    setLoading(true);

    addNoteToDb(formData).then((res) => {
      setLoading(false);

      if (res.message) {
        return setShowModal({ message: res.message, type: 'success' });
      }

      setShowModal({ message: res.error, type: 'error' });
    });
  };

  const pinNoteHandler = (noteId) => {
    setLoading(true);

    let modifiedNote = null;
    const note = findById(noteId, allNotes);

    if (note.pinned) {
      modifiedNote = { ...note, pinned: false };
    } else {
      modifiedNote = { ...note, pinned: true };
    }

    updateNoteInDb(modifiedNote).then((res) => {
      if (res.message) {
        return getAllNotes();
      }

      setShowModal({ message: res.error, type: 'error' });
    });
  };

  const confirmHandler = (operation = 'delete', noteId) => {
    setLoading(true);
    console.log(loading);
    if (operation === 'delete') {
      deleteNoteFromDb(noteId).then((res) => {
        if (res.message) {
          setCurrentPage(1);
          return getAllNotes();
        }

        setShowModal({ message: res.error, type: 'error' });
      });
    }
  };

  const deleteHandler = (noteId) => {
    const note = findById(noteId, allNotes);

    setShowModal({
      type: 'confirm',
      heading: `Do you want to delete? ${note.title}`,
      message: `This action is irreversable.`,
      cancelHandler: modalClickHandler,
      confirmHandler,
      note,
    });
  };

  const addBtnClickHandler = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    dispatchForm({ type: 'reset' });
  };

  const inputChangeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    dispatchForm({ type: id, payload: value });
  };

  const modalClickHandler = (type) => {
    if (type === 'done') {
      getAllNotes();
    } else {
      setShowModal(null);
    }
  };

  const searchHandler = (e) => {
    const searchString = e.target.value;
    setSearchString(searchString);
    setCurrentPage(1);

    if (searchString.length) {
      searchNoteInDb(searchString).then((res) => setAllNotes(res));
    } else if (!searchString) {
      getAllNotes();
    }
  };

  const editForm = (note) => {
    const modifiedNote = { id: note.id, title: note.title, tagline: note.tagline, body: note.body, pinned: note.pinned, created_on: note.created_on };

    dispatchForm({ type: 'update', payload: modifiedNote });
    setShowForm(true);
  };

  const updateNote = () => {
    setLoading(true);
    updateNoteInDb(formData).then((res) => {
      if (res.message) {
        return setShowModal({ message: res.message, type: 'success' });
      }

      setShowModal({ message: res.error, type: 'error' });
    });
  };

  const mainHeaderProps = { addBtnClickHandler, searchString, searchHandler };
  const formProps = { formData, closeForm, inputChangeHandler, saveNote, updateNote };
  const modalProps = { modalClickHandler, ...showModal };

  return (
    <div className="notes-wrapper">
      <div className="notes-wrapper__header">{props.type === 'pinned' ? null : <MainHeader {...mainHeaderProps} />}</div>

      <section className="cards-grid-container">
        {allNotes.length > 0 && !loading ? (
          allNotes.map((item) => {
            return (
              <div className="grid-item" key={item.id}>
                <Card editForm={editForm} pinned={true} {...item} pinNoteHandler={pinNoteHandler} deleteNoteHandler={deleteHandler} />
              </div>
            );
          })
        ) : (
          <>{!loading && <EmptyContainer />}</>
        )}
      </section>

      {allNotes.length > 0 && !searchString && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            className="prev-btn"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
                getAllNotes('back');
              }
            }}>
            <i className="bx bx-left-arrow-alt"></i>
            <span> Back</span>{' '}
          </button>
          <button
            disabled={currentPage === Math.ceil(listSize / MAX_NOTES_TO_SHOW)}
            className="next-btn"
            onClick={() => {
              console.log(allNotes.length);
              if (currentPage < Math.ceil(listSize / MAX_NOTES_TO_SHOW)) {
                setCurrentPage(currentPage + 1);
                getAllNotes('next');
              }
            }}>
            <span>Next</span>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      )}

      {loading && <Modal type="loading" overlayColor="rgba(255, 255, 255, 0.877)" />}
      {showForm && <Modal type="form" {...formProps} />}
      {showModal && <Modal overlayColor="rgba(255, 255, 255, 0.877)" {...modalProps} />}
    </div>
  );
};

const MainHeader = (props) => {
  const { addBtnClickHandler, searchString, searchHandler } = props;
  return (
    <>
      <div className="input-container">
        <InputComponent type="icon-input" placeholder="Search Notes" icon={<i className="bx bx-search"></i>} value={searchString} onChange={searchHandler} />
      </div>
      <Button onClick={addBtnClickHandler}> Add Note </Button>
    </>
  );
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };

    case 'tagline':
      return { ...state, tagline: action.payload };

    case 'body':
      return { ...state, body: action.payload };

    case 'pin':
      return { ...state, pinned: !state.pinned };

    case 'reset':
      return { title: '', tagline: '', body: '', pinned: false };

    case 'update':
      return action.payload;

    default:
      return state;
  }
};

export default Notes;
