import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';

const observer = new MutationObserver(() => {
  const endElement = document.querySelector("#end");
  if(endElement) {
    const appContainer = document.createElement("div");
    endElement.insertBefore(appContainer, endElement.firstChild);
    ReactDOM.render(<App />, appContainer);
    observer.disconnect();
  }
});

observer.observe(document, {attributes: true, childList: true, subtree: true});
