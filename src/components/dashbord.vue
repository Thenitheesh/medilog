<script >
import {ref} from 'vue';
export default{
methods: {
   previewFiles(event) {
      console.log(event.target.files.value);
   }
}}


</script>

<template>
 
  
<h1>Dashbord</h1>
<input type="file" @change="previewFiles" multiple>
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
