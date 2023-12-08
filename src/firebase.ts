import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const apiKey = import.meta.env.VITE_apiKey
const authDomain= import.meta.env.VITE_authDomain
const projectId = import.meta.env.VITE_projectId
const  storageBucket = import.meta.env.VITE_storageBucket
const messagingSenderId = import.meta.env.VITE_messagingSenderId
const appId = import.meta.env.VITE_appId
const vapidKey=import.meta.env.VITE_vapidKey

var firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getNotificationToken = async() => {
  const browserToken=await getToken(messaging, { vapidKey:vapidKey }).then(async(currentToken) => {
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