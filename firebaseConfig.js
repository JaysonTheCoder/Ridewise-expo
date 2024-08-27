import { getAuth } from "firebase/auth"
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyDbVIGxkfNy-2s_LsvyNRO10hW0w43Jf00",
  authDomain: "ridewise-app-ae7d5.firebaseapp.com",
  projectId: "ridewise-app-ae7d5",
  storageBucket: "ridewise-app-ae7d5.appspot.com",
  messagingSenderId: "50728180794",
  appId: "1:50728180794:web:1d6d8dab7da96d500ba903",
  measurementId: "G-6L3G3LB2W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, db }