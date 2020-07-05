export function get(key: string) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get([key], result => {
        resolve(result[key]);
      });
    }
    catch(error) {
      reject(error);
    }
  });
}

export function set(key: string, value: any) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({[key]: value}, resolve);
    }
    catch(error) {
      reject(error);
    }
  });
}