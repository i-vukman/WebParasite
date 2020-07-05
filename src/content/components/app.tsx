import React, {useState, useEffect, CSSProperties} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../firebase-config';
import ChromeMessageType from '../../types/chrome-message-type';
import * as localStorage from '../../local-storage';
import ChromeMessage from '../../types/chrome-message';
import LocalStorageKeys from '../../types/local-storage-keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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
      if(message.type === ChromeMessageType.Liked)
        setHasLiked(true);
    });

    chrome.runtime.onMessage.addListener(handleChromeMessage);

    localStorage.get(LocalStorageKeys.HasLiked)
      .then(setHasLiked)
      .then(() => setIsLoading(false));

    return () => {
      unsubscribeFirebase();
      chrome.runtime.onMessage.removeListener(handleChromeMessage);
    }
  }, []);

  const handleLikeClick = () => {
    setIsLoading(true);
    chrome.runtime.sendMessage({type: ChromeMessageType.Like}, () => setIsLoading(false));
  }

  let likeColor;
  if(isLoading)
    likeColor = "#458af7";
  else if(hasLiked)
    likeColor = "#2222ff";

  return (
    <div>
      <FontAwesomeIcon
        onClick={() => !isLoading && handleLikeClick()}
        icon={faThumbsUp}
        size={'2x'}
        style={ {...likeStyle, color: likeColor} }
      />
      <div>
        Likes: {likesCount}
      </div>
    </div>
  );
}

const likeStyle: CSSProperties = {
  cursor: "pointer",
  marginLeft: 5,
  marginTop: 10
};

export default App;
