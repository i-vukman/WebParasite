import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';

console.log("Content script triggered");

const endElement = document.querySelector("#end");
const appContainer = document.createElement("div");
endElement.insertBefore(appContainer, endElement.firstChild);
ReactDOM.render(<App />, appContainer);
