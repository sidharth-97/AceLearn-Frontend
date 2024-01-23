# AceLearn(A Private Tutor Platform) Frontend

This is the frontend repository for the AceLearn, an online education platform that connects students with tutors.

## Getting Started

These instructions will help you set up and run the backend of the Private Tutor Platform on your local machine for development and testing.

### Installation

1. Clone the repository:

git clone https://github.com/sidharth-97/AceLearn-Frontend.git

2. Navigate to the project directory

3. Install dependencies:

npm install

4. Set up environment variables:

Create a '.env' file in the root of your project and configure the necessary environment variables, such as database connection details, authentication secrets, and other relevant settings.

VITE_APP_CLIENT_ID and VITE_apiKey from google auth
VITE_authDomain,VITE_projectId,VITE_storageBucket,VITE_messagingSenderId,VITE_appId,VITE_vapidKey from firebase for web push notification
VITE_SOCKET_URL,VITE_AXIOS_URL from backend 
VITE_APPID,VITE_SERVERSECRET from Zegocloud

5. Start the server:
npm run dev
