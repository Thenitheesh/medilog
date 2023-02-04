<script setup >
/*import {ref} from 'vue';
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
/* const gett=()=>{
  let upfile=document.getElementById('hell')
  console.log(upfile.files[0])
}
 
 const uid =getAuth().currentUser.uid;
 const db = getFirestore(app);
 const gett=await setDoc(doc(db, "user",uid ), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
}); */
</script>

<template>
 
  
<h1>Dashbord</h1>
<input type="file" id="hell">
<button @click="gett">get</button>
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
