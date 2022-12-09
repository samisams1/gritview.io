import firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyDVDNRYbXGIo4wkPRtTqeV8CaFGiubUhSA",
  authDomain: "gritview.firebaseapp.com",
  projectId: "gritview",
  storageBucket: "gritview.appspot.com",
  messagingSenderId: "633788007011",
  appId: "1:633788007011:web:343ce24b112ff438eaae56",
  measurementId: "G-3L36PP3K8F",
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export default firebase;
