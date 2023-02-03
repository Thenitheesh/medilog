import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/App";
import { browserLocalPersistence,getAuth,setPersistence,} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTk2SF4sfPtSuAaf7fxdmjr6Z9rD9SlNo",
  authDomain: "medilog-32448.firebaseapp.com",
  projectId: "medilog-32448",
  storageBucket: "medilog-32448.appspot.com",
  messagingSenderId: "1041724374778",
  appId: "1:1041724374778:web:a303f17632769b5d51d343",
  measurementId: "G-GPCE763NNV",
};
const app=initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
createApp(App).use(router).mount("#app");
