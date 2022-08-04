import { collection, addDoc, getDocs, query, limit, orderBy, updateDoc, doc, deleteDoc, where, endBefore, startAfter } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

import { generateCurrentTime } from './helper-method';

let latestNote = [];

export const addNoteToDb = async (note) => {
  const noteWithTime = { ...note, created_on: generateCurrentTime() };

  try {
    const docRef = await addDoc(collection(db, 'notes'), noteWithTime);
    return { message: 'Note saved successfully!', id: docRef.id };
  } catch (e) {
    return { error: 'Error! Cannot save note.' };
  }
};

export const getAllNotesFromDb = async (MaxLimit, operation) => {
  const notesRef = collection(db, 'notes');

  try {
    let q = query(notesRef, orderBy('created_on', 'desc'), limit(MaxLimit));
    if (operation === 'next') {
      q = query(notesRef, orderBy('created_on', 'desc'), startAfter(latestNote), limit(MaxLimit));
    } else if (operation === 'back') {
      q = query(notesRef, orderBy('created_on', 'desc'), endBefore(latestNote), limit(MaxLimit));
    }

    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(notesRef);
    const size = querySnapshot2.size;

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    latestNote = querySnapshot.empty ? null : querySnapshot.docs[querySnapshot.docs.length - 1];

    return { data, size };
  } catch (e) {
    return { error: 'Error! Internal Server Error.' };
  }
};

export const updateNoteInDb = async (note) => {
  const noteWithTime = { ...note, updated_on: generateCurrentTime() };
  const noteDoc = doc(db, 'notes', noteWithTime.id);

  try {
    await updateDoc(noteDoc, noteWithTime);
    return { message: 'Note updated successfully!' };
  } catch (e) {
    return { error: 'Error! Cannot save note.' };
  }
};

export const deleteNoteFromDb = async (noteId) => {
  const noteDoc = doc(db, 'notes', noteId);

  try {
    await deleteDoc(noteDoc);
    return { message: 'Deleted successfully !' };
  } catch (e) {
    return { error: 'Error! Cannot delete note.' };
  }
};

export const searchNoteInDb = async (string) => {
  const notesRef = collection(db, 'notes');

  try {
    const q = query(notesRef, where('title', '>=', string), where('title', '<=', string + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (e) {
    return { error: 'Error! Internal Server Error.' };
  }
};

export const getPinnedNotesFromDb = async () => {
  const notesRef = collection(db, 'notes');

  try {
    const q = query(notesRef, where('pinned', '==', true));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (e) {
    return { error: 'Error! Internal Server Error.' };
  }
};
