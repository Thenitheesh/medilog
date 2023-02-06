import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/App";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence,getAuth,setPersistence,} from "firebase/auth";
import './assets/tailwind.css'
const firebaseConfig = {
  apiKey: "AIzaSyDTk2SF4sfPtSuAaf7fxdmjr6Z9rD9SlNo",
  authDomain: "medilog-32448.firebaseapp.com",
  databaseURL: "https://medilog-32448-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medilog-32448",
  storageBucket: "medilog-32448.appspot.com",
  messagingSenderId: "1041724374778",
  appId: "1:1041724374778:web:a303f17632769b5d51d343",
  measurementId: "G-GPCE763NNV"
};
const app=initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
setPersistence(auth, browserLocalPersistence);
createApp(App).use(router).mount("#app");
