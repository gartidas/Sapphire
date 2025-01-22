import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import firebaseAdmin from "./firebase-admin";

firebase.initializeApp(firebaseAdmin);
firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectFirestoreObject = firebase.firestore;
const projectAuth = firebase.auth();
const projectAuthObject = firebase.auth;
const FieldValue = firebase.firestore.FieldValue;
const FieldPath = firebase.firestore.FieldPath;
const getTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

export {
  projectStorage,
  projectFirestore,
  projectFirestoreObject,
  projectAuth,
  projectAuthObject,
  getTimestamp,
  FieldValue,
  FieldPath,
};
