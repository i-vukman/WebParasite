import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../firebase-config';
import ChromeMessageType from '../types/chrome-message-type';

document.body.innerHTML = "";

const pannel = document.createElement("div");
pannel.setAttribute("style", "width: 200px; height: 100px; background-color: #ccc");
document.body.appendChild(pannel);

const button = document.createElement("button");
button.setAttribute("style", "width: 100px; height: 100px; margin-left: 100px")
document.body.appendChild(button);

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.collection("likes-count").doc("likes-count");

docRef.onSnapshot(function (doc) {
  if(doc && doc.exists) {
    const myData = doc.data();
    pannel.innerText = myData.count;
  }
});

button.onclick = (e) => {
  chrome.runtime.sendMessage({type: ChromeMessageType.ToggleLike});
};
