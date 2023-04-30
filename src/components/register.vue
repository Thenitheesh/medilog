<template>
     <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        
        <h2 id="head-text" class="mt-6 text-center text-3xl  tracking-tight text-gray-900">Create your account&#128125</h2>
        
      </div>
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md ">
            <div>
            <label  class="sr-only">Name</label>
            <input id="display-name" v-model="name"  name="name" type="text" autocomplete="name" required="" class="relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Name" />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="email"  name="email" type="email" autocomplete="email" required="" class="relative block mt-2 w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
          </div>
          <div>
            <label for="password"  class="sr-only">Password</label>
            <input id="password" name="password"  v-model="password"   type="password" autocomplete="current-password" required="" class="relative block mt-2 w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
          </div>
        </div>

        <div id="submitbtn">
    
          <button  @click="register" class="group  ml-50 flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Submit
          </button>
        
    </div>
    </div>
  </div>

</template>
  <style scoped>
    #submitbtn{
        margin-left: 30%;
    }
    #head-text{
        color: black;
  font-size: 1.8rem;
  font-family: 'Poppins', sans-serif;
  top: 70px;
  font-weight: bold;
    }
</style>
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
                level: false,
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
  
