import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../firebase-config';

function App() {
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();
    const docRef = firestore.collection("likes-count").doc("likes-count");

    const unsubscribeListener = docRef.onSnapshot(doc => {
      if(doc && doc.exists) {
        const data = doc.data();
        setLikesCount(data.count);
      }
    });

    return unsubscribeListener;
  }, []);

  return (
    <div>
      Number of likes is {likesCount}
    </div>
  );
}

export default App;
