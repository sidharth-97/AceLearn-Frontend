import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from 'axios'
var firebaseConfig = {
    apiKey: "AIzaSyBEqFtqD-dDY6zGfTO00g_x4qIdzJF9Dsg",
    authDomain: "acelearn-703df.firebaseapp.com",
    projectId: "acelearn-703df",
    storageBucket: "acelearn-703df.appspot.com",
    messagingSenderId: "405743273695",
    appId: "1:405743273695:web:e9b8c926b58757c8388b6a"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getNotificationToken = async() => {
  const browserToken=await getToken(messaging, { vapidKey: 'BIfLy7_lef878KCkEfkfhN7S2mh1ynoJxwgeMzBgQy0f5nztIywGkoyY7hD4Cgu0qlYGZTHO9TVKiMqfFY5TtdI' }).then(async(currentToken) => {
        // debugger
        if (currentToken) {
            
            return currentToken
            // localStorage.setItem('fcm-token', currentToken);
            // await axios.post('http://localhost:8000/register', {token:currentToken});
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
    return browserToken
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });