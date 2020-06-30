import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../firebase-config';

class App extends React.Component {
  state = {
    count: 0
  };

  docRef: firebase.firestore.DocumentReference;
  unsubscribeListener: () => void;

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    var firestore = firebase.firestore();

    this.docRef = firestore.collection("likes-count").doc("likes-count");
    
    this.unsubscribeListener = this.docRef.onSnapshot(doc => {
      if(doc && doc.exists) {
        const myData = doc.data();
        this.setState({count: myData.count});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeListener();
  }

  render() {
    return (<div>Number of likes {this.state.count}</div>);
  }
}

export default App;