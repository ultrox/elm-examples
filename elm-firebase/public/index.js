  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// initialze elm
  var elmApp = Elm.Main.init({ node: app })

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC4-YEHVg-Tnmc_qA6AJi8f5meIGNkCe_k",
    authDomain: "subtitles-82070.firebaseapp.com",
    databaseURL: "https://subtitles-82070-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "subtitles-82070",
    storageBucket: "subtitles-82070.appspot.com",
    messagingSenderId: "198094719161",
    appId: "1:198094719161:web:ba1700d35fd32ede2d7368",
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    measurementId: "G-0JV6WMTQDN"
  };

  // Initialize (f)irebase (b)ase (a)pp
  const fba = initializeApp(firebaseConfig);
  console.log(elmApp, fba);
