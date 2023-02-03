<script setup>
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';
const auth = getAuth();
const router=useRouter();

onAuthStateChanged(auth, (user) => {
  if (user!=null) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    router.push('/home')
  }
})


</script>

<template>
 
  <a href="/dashbord">dashbord</a> 
  <a href="/login">login</a> 
  <a href="/home">home</a>
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
