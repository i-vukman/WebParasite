import axios from 'axios';

export function like() {
  return axios.put("https://europe-west3-web-parasite.cloudfunctions.net/like");
}

export function unlike() {
  return axios.put("https://europe-west3-web-parasite.cloudfunctions.net/unlike");
}