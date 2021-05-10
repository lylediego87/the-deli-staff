import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './user.types';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './user.actions';
import { auth, googleProvider, getCurrentUser } from '../../firebase/firebase.utils';


export function* signInWithGoogle() {
  try { 
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield put(signInSuccess({displayName: user['displayName'] , email: user['email'] , photoUrl: user['photoURL']}))
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try{
    const user = yield getCurrentUser();
    if(!user) return;
    yield put(signInSuccess({displayName: user['displayName'] , email: user['email'] , photoUrl: user['photoURL']}))
  }
  catch(error){
    yield put(signInFailure(error));
  }
}

export function* signOut(){
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart)
  ]);
}