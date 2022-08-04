// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5FMblqgSYjPmkjzLHm-3tSmLR_uzmV1A',
  authDomain: 'be-zen-51a86.firebaseapp.com',
  projectId: 'be-zen-51a86',
  storageBucket: 'be-zen-51a86.appspot.com',
  messagingSenderId: '532839349654',
  appId: '1:532839349654:web:48be39c3db708f3b1fb1b7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
