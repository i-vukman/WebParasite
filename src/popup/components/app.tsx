import React, {useState, useEffect, CSSProperties} from 'react';

function App() {
  const [activeTabUrl, setActiveTabUrl] = useState("");

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow:true}, (tabs) => {
      const activeTab = tabs[0];
      const activeTabUrl = activeTab && activeTab.url;
      setActiveTabUrl(activeTabUrl);
    })
  }, []);

  if(activeTabUrl)
    return (
      <div>
        Active tab url is: {activeTabUrl}
      </div>
    );
  
  return (
    <div>Extension doesn't have permission for this page.</div>
  );
}

export default App;