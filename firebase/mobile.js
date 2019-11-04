import * as firebase from 'firebase/app';
import { mobileConfig } from './config';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(mobileConfig);
}
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
let db = firebase.firestore();
let user = null;
function getUser() { return user; }
function setUser(user) { user = user; }

export { db, setUser, getUser };