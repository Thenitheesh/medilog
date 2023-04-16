<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Name" v-model="name" /></p>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
</template>
  
<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router' // import router
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../main.js'
const email = ref('')
const password = ref('')
const name = ref('') // we added this 
const auth = getAuth() // get a reference to our firebase auth
const router = useRouter()
// get a reference to our vue router

const register = () => {

    createUserWithEmailAndPassword(auth, email.value, password.value) // need .value because ref()
        .then((data) => {
            const uid = data.user.uid;
            setDoc(doc(db, "user", uid), {
                level: false
            }).then(() => {
                console.log("Document written with ID: ", uid);
            })
            updateProfile(auth.currentUser, {
                displayName: name.value, photoURL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${name.value}`
            }).then(() => {
                window.opener.location.href = 'http://' + window.location.host + '/patientDash';
                window.close();
            })


        })
        .catch(error => {
            console.log(error.code)
            alert(error.message);
        });
}
</script>
  
