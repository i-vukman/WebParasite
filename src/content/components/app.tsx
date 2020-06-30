import React, {useState, useEffect, CSSProperties} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../firebase-config';
import ChromeMessageType from '../../types/chrome-message-type';
import * as localStorage from '../../local-storage';
import ChromeMessage from '../../types/chrome-message';

function App() {
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();
    const docRef = firestore.collection("likes-count").doc("likes-count");

    const unsubscribeFirebase = docRef.onSnapshot(doc => {
      if(doc && doc.exists) {
        const data = doc.data();
        setLikesCount(data.count);
      }
    });

    const handleChromeMessage = ((message: ChromeMessage) => {
      if(message.type === ChromeMessageType.LikeToggled)
        setHasLiked(message.payload);
    });

    chrome.runtime.onMessage.addListener(handleChromeMessage);

    localStorage.get("hasLiked")
      .then(setHasLiked)
      .then(() => setIsLoading(false));

    return () => {
      unsubscribeFirebase();
      chrome.runtime.onMessage.removeListener(handleChromeMessage);
    }
  }, []);

  const handleLikeClick = () => {
    setIsLoading(true);
    chrome.runtime.sendMessage({type: ChromeMessageType.ToggleLike}, () => setIsLoading(false));
  }

  return (
    <button
      style={hasLiked ? activeLikeStyle : inactiveLikeStyle}
      disabled={isLoading} 
      onClick={handleLikeClick}
    >
      Parasite Likes: {likesCount}
    </button>
  );
}

const activeLikeStyle: CSSProperties = {
  backgroundColor: "#458af7",
  border: "none",
  borderRadius: "10px 10px"
};

const inactiveLikeStyle: CSSProperties = {
  border: "none",
  borderRadius: "10px 10px"
};

export default App;
