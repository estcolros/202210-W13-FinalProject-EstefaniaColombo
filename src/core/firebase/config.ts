// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: 'AIzaSyA6Y7YD8prZQrkpsZuRj5S0RwSfGIC0glw',
    authDomain: 'petadopt-6a034.firebaseapp.com',
    databaseURL:
        'https://petadopt-6a034-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'petadopt-6a034',
    storageBucket: 'petadopt-6a034.appspot.com',
    messagingSenderId: '548509511999',
    appId: '1:548509511999:web:0dbaa2b8824bb07072e38a',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);

export const loginWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
};

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};
