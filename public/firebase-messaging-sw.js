importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBEqFtqD-dDY6zGfTO00g_x4qIdzJF9Dsg",
    authDomain: "acelearn-703df.firebaseapp.com",
    projectId: "acelearn-703df",
    storageBucket: "acelearn-703df.appspot.com",
    messagingSenderId: "405743273695",
    appId: "1:405743273695:web:e9b8c926b58757c8388b6a"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message', payload);
    const { title, body } = payload.notification;

    // Customize notification options as needed
    const notificationOptions = {
        body: body,
        icon: '../src/assets/image-removebg-preview.png', // Add the path to your notification icon
    };

    return self.registration.showNotification(title, notificationOptions);
});
