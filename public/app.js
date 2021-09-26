// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js"

// convers.ee web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzl_RfAB-OWqfjD9X4I0OIJMfZdqujn04",
    authDomain: "conversee-64277.firebaseapp.com",
    databaseURL: "https://conversee-64277-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "conversee-64277",
    storageBucket: "conversee-64277.appspot.com",
    messagingSenderId: "376000839025",
    appId: "1:376000839025:web:f313c5a992fa0813c84ad0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize a Realtime Database
const db = getDatabase();

// Make the database available for other scripts
export { db }