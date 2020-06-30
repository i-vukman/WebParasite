import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';

const primaryContainer = document.querySelector("#primary");
const appContainer = document.createElement("div");
primaryContainer.insertBefore(appContainer, primaryContainer.firstChild);
ReactDOM.render(<App/>, appContainer);
