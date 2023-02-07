<script setup>
 import {onMounted, ref,onBeforeMount} from 'vue';
 import { getAuth,onAuthStateChanged} from "firebase/auth";
 import { doc,setDoc,getDoc} from "firebase/firestore";
import {db} from '../main.js'
 import { useRouter } from 'vue-router';

const auth = getAuth();

const router=useRouter();

 
  
  

   const gett= async ()=>{
    /* const uid =auth.currentUser.uid;
    setDoc(doc(db, "user",uid ), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
}); */ 
const uid =auth.currentUser.uid;
const docRef = doc(db, "user", uid);
const docSnap =await  getDoc(docRef);
console.log(docSnap.data().level);
 }
const name=ref("");
onAuthStateChanged(auth, (user) => {
  if (user!=null) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
     
    //console.log(user.uid);
    const imageURL= user.photoURL;
    document.getElementById("img").src=imageURL;
    
    name.value=user.displayName;
  } else {
      router.push('/')
  }

})






const out=()=>{
  auth.signOut().then(() => {
    alert("signout successfully")
    console.log("signout successfully")
    router.push('/dashbord')
  }).catch((error) => {
    // An error happened.
  });
} 
</script>

<template>
 
  
<h1>home</h1>
<img :src="imageURL" id="img" referrerpolicy="no-referrer">
<h1 >{{ name }}</h1>
<button @click="out" >signout</button>
<p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, quibusdam.</p>
<button @click="gett">push details</button>
<router-view/>
</template>

<style scoped>

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
