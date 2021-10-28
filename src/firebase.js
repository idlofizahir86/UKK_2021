import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmdeAuBSpQJYi9hiiueqnrZJyBEcn9ltA",
  authDomain: "ukk-2021.firebaseapp.com",
  databaseURL: "https://ukk-2021-default-rtdb.firebaseio.com",
  projectId: "ukk-2021",
  storageBucket: "ukk-2021.appspot.com",
  messagingSenderId: "1034294319495",
  appId: "1:1034294319495:web:152b30872cc10aabaf5b22"
};

  firebase.initializeApp(firebaseConfig);

const fbdb = firebase.database();
const auth = firebase.auth();

  export { fbdb };
  export { auth };
