import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCAReW1hkh5HTzvNReFmbvUc-MI6l9wdow",
    authDomain: "skillsync-56cd6.firebaseapp.com",
    projectId: "skillsync-56cd6",
    storageBucket: "skillsync-56cd6.firebasestorage.app",
    messagingSenderId: "571313500799",
    appId: "1:571313500799:web:2bd7fbc189cbf85a0d854a"
  };

// Initialize Firebase only if it's not already initialized
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

export { auth };
