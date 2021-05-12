import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCSMCKDMpSAdTj79kwexeFXmo5j7KeH_78",
  authDomain: "the-deli-8452a.firebaseapp.com",
  projectId: "the-deli-8452a",
  storageBucket: "the-deli-8452a.appspot.com",
  messagingSenderId: "572397137876",
  appId: "1:572397137876:web:7d713362948d2c40c8b041",
  measurementId: "G-J8RFHYMRB1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((reslove, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      reslove(userAuth);
    },reject)
  })
}