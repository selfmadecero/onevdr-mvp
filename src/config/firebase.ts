import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyACDccGoyl8sNxKxUHliU2qP1WDT2i4jlY",
    authDomain: "onevdr-mvp-c46ff.firebaseapp.com",
    projectId: "onevdr-mvp-c46ff",
    storageBucket: "onevdr-mvp-c46ff.appspot.com",
    messagingSenderId: "243161857142",
    appId: "1:243161857142:web:a698f2ac7fee56254a7357",
    measurementId: "G-WKE8QJSSXW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);