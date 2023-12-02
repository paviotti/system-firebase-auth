// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAndNSKt-W6dJ6kEbs8pTOlFZtTKNoUDno",
  authDomain: "udemy-react-2023-d1847.firebaseapp.com",
  projectId: "udemy-react-2023-d1847",
  storageBucket: "udemy-react-2023-d1847.appspot.com",
  messagingSenderId: "319384029980",
  appId: "1:319384029980:web:598c16e6e3f6d2abc848d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// https://firebase.google.com/docs/auth/web/start?authuser=0&hl=pt
const auth = getAuth(app); //permite ler toda a configuração acima

export { auth };
