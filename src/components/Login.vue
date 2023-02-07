<script setup>
import { ref,onBeforeMount} from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { doc,setDoc,getDoc} from "firebase/firestore";
import {db} from '../main.js'
const provider = new GoogleAuthProvider();
const auth = getAuth();
const router = useRouter();



const signgoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      router.push('/home');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
const Email = ref('');
const Password = ref('');
const signin = (err) => { // we also renamed this method
  //console.log(Email.value, Password.value);
  signInWithEmailAndPassword(auth, Email.value, Password.value) // THIS LINE CHANGED
    .then((data) => {
      //console.log('Successfully logged in!');
      router.push('/home') // redirect to the feed
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);

    })
}


</script>

<template >

  <div class="card1">
    <h1 class="login">Login&#128076</h1>
    <p class="logbelow">How do get i started?</p>
    <button @click="signgoogle" class="select-box1">
      <img class="googleicon" src="/src/assets/icons8-google.svg" alt="">
      <p class="sigpara">Sign in with Google</p>
    </button>
    <h2 class="orsign"><span>or Sign in with Email</span></h2>
    <p class="emailpara">Email</p>
    <div class="select-box2">
      <input class="emailin" v-model="Email" type="email">
    </div>
    <p class="passpara">Password</p>
    <div class="select-box3">
      <input class="passin" v-model="Password" type="password">
    </div>
    <p class="forpara">Forget Password?</p>
    <button @click="signin" class="loginbtn">Login</button>
    <p class="belowpara">&copy Nitheesh All Right Reserved</p>

    <div class="card2">

      <img class="line1" src="/src/assets/Line1.svg" alt="">
      <img class="line2" src="/src/assets/Line1.svg" alt="">
      <div class="card3">
        <img src="../assets/onlinedoctor.svg" alt="">
      </div>
    </div>
  </div>


</template>

<style scoped>

.passin {
  background-color: transparent;
  border: none;
  padding: 0%;
  color: black;
  position: absolute;
  left: 15px;
  top: 5px;
  width: 226px;

  font-size: 0.8rem;
  color: #5d5d5f;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.passin:focus {
  outline: none;
}

.emailin {
  background-color: transparent;
  border: none;
  padding: 0%;
  color: black;
  position: absolute;
  width: 226px;
  left: 15px;
  top: 5px;

  font-size: 0.8rem;
  color: #5d5d5f;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.emailin:focus {
  outline: none;
}

.belowpara {
  position: absolute;
  left: 120px;
  top: 500px;
  color: #c7c8ca;
  font-size: 0.68rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.loginbtn {
  font-size: 0.8rem;

  position: absolute;
  width: 260px;
  height: 35px;
  left: 120px;
  top: 410px;
  background-color: #5138EE;
  border: 1.5px solid #5138EE;
  border-radius: 23px;
  z-index: 10;
}

.forpara {
  position: absolute;
  left: 282px;
  top: 384px;
  font-size: 0.7rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  color: #5840EF;
}

.select-box3 {
  box-sizing: border-box;

  position: absolute;
  width: 260px;
  height: 35px;
  left: 120px;
  top: 340px;

  border: 1.5px solid #e4e5e8;
  border-radius: 23px;
  z-index: 10;
}

.passpara {
  position: absolute;
  left: 120px;
  top: 315px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

}

.select-box2 {
  box-sizing: border-box;

  position: absolute;
  width: 260px;
  height: 35px;
  left: 120px;
  top: 270px;

  border: 1.5px solid #e4e5e8;
  border-radius: 23px;
  z-index: 10;
}

.emailpara {
  position: absolute;
  left: 120px;
  top: 245px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.orsign {
  position: absolute;
  top: 204px;
  left: 120px;
  width: 260px;
  height: 10px;
  text-align: center;
  border-bottom: 1.5px solid #e4e5e8;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.orsign span {
  font-size: 0.7rem;
  font-family: 'Poppins', sans-serif;
  background: #fff;
  color: #c7c8ca;
  padding: 0 10px;
}

.sigpara {
  position: absolute;
  left: 94px;
  top: 8px;
  z-index: 5;
  font-size: 0.7rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  color: black;
}

.googleicon {
  position: absolute;
  left: 64px;
  top: 7px;
  width: 18px;
  height: 18px;
}

.select-box1 {
  box-sizing: border-box;

  position: absolute;
  width: 260px;
  height: 35px;
  left: 120px;
  top: 161px;
  background-color: transparent;
  border: 1.5px solid #e4e5e8;
  border-radius: 23px;
  z-index: 10;
}

.logbelow {
  color: black;
  position: absolute;
  left: 120px;
  top: 112px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

}

.login {
  color: black;
  font-size: 1.8rem;
  position: absolute;
  left: 120px;
  font-family: 'Poppins', sans-serif;
  top: 70px;
  font-weight: bold;
}

.line2 {
  transform: rotate(180deg);
  position: absolute;
    height: 382px;
    top: 197px;
    right: 157px;
}

.line1 {
  position: absolute;
  
    width: 419.54px;
    height: 530px;
    top: 95px;
    right: 108px;
}

.card3 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 372px;
  height: 478px;
  background: linear-gradient(210.35deg, #A294F6 0%, #7462E4 100%);
  border-radius: 26px;
  z-index: 10;
}

.card1 {

  width: 1046px;
    height: 579px;
    margin-top: 24px;
  position: absolute;
    left: 223px;
  display: flex;
  justify-content: flex-end;
  background: #FFFFFF;
  border-radius: 24px;
}

.card2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 526px;
  height: 579px;


  background: linear-gradient(33.41deg, #533BEE 0%, #9181F4 99.33%);
  border-radius: 0px 25px 25px 0px;
}

.read-the-docs {
  color: #888;
}
@media screen and (max-width: 768px) {
  /* For mobile phones: */
  .card2{
    width: 0px;
    height: 0;
   
  }
   .card1{
    left: 24px;
    width: 347px;
  } 
  .line1,.line2{
    width: 0px;
    height: 0;
  }
  .belowpara,.loginbtn,.select-box3,.passpara,.select-box2,.emailpara,.select-box1,.logbelow,.login{
    left: 55px;
  }
.orsign{
    left: 55px;
  }
  .forpara{
    left: 218px;
  }
}
</style>
