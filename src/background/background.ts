import ChromeMessage from "../types/chrome-message";
import ChromeMessageType from "../types/chrome-message-type";
import * as localStorage from "../local-storage";
import axios from 'axios';

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
  return true;
});

async function handleMessage(message: ChromeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
  switch(message.type) {
    case(ChromeMessageType.ToggleLike): {
      const hasLiked = await localStorage.get("hasLiked");
      if(hasLiked)
        await axios.put("https://europe-west3-web-parasite.cloudfunctions.net/unlike");
      else
        await axios.put("https://europe-west3-web-parasite.cloudfunctions.net/like");
            
      await localStorage.set("hasLiked", !hasLiked);
      
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {type: ChromeMessageType.LikeToggled, payload: !hasLiked});
        });
        sendResponse();
      });

      break;
    };
  }
}
