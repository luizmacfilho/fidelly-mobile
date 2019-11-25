import * as firebase from 'firebase/app';
import { mobileConfig, adminConfig } from './config';
import 'firebase/auth';
import 'firebase/firestore';

let db = null;
let admin = null;
if (!firebase.apps.length) {
  const primary = firebase.initializeApp(mobileConfig);
  const secondary = firebase.initializeApp(adminConfig, 'admin');
  db = primary.firestore();
  admin = secondary.firestore();
  primary.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

let user = null;
function getUser() { return user; }
function setUser(_user) { user = _user; }

export { db, setUser, getUser, admin };
