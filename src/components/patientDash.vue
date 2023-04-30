<script setup>
import { ref, onBeforeMount } from 'vue'
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../main.js';
import { useRouter } from 'vue-router';
import Web3 from 'web3/dist/web3.min.js'
import configuration from '../MedicalRecord.json'
import { Buffer } from 'buffer'
import { create, urlSource } from 'ipfs-http-client'
const CONTRACT_ADDRESS = configuration.networks[11155111].address;
const CONTRACT_ABI = configuration.abi;
const auth = getAuth();

const router = useRouter();
const gett = async () => {
    /* const uid =auth.currentUser.uid;
    setDoc(doc(db, "user",uid ), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
  }); */

    /* const docRef = doc(db, "appointment");
    const docsSnap = await getDocs(docRef);
    docsSnap.forEach(doc => {
      console.log(doc.data());
    }) */
}
const MNEMONIC="method aunt core law hungry cabin galaxy silk plate solution loan uniform"
const PROJECT_ID ="d6514ef113e54594920071757a94b38b"
const web3 = new Web3(Web3.givenProvider || new HDWalletProvider(MNEMONIC, `https://sepolia.infura.io/v3/${PROJECT_ID}`))
var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const enable = () => {
    ethereum.request({ method: 'eth_requestAccounts' });
};
const getrecords = () => {
    web3.eth.getAccounts().then(async function (accounts) {
        let address = accounts[0]
        document.getElementById('overl').style.visibility = "visible";
        contract.methods.getRecord(address).call().then(function (result) {
                document.getElementById("patientName").innerHTML=result[3];
                document.getElementById("patiAdree").innerHTML=result[0]; 
                document.getElementById("descr").innerHTML=result[1]; 
                document.getElementById("Location").innerHTML=result[5]; 
                document.getElementById("dob").innerHTML=result[4]; 
                document.getElementById("docter").innerHTML=result[2]; 
    document.getElementById('overl').style.visibility = "hidden";
        });
    })
}
const name = ref("");
const patientName = ref('');
onAuthStateChanged(auth, (user) => {
    if (user != null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        //console.log(user.uid);
        const imageURL = user.photoURL;
        document.getElementById("img").src = imageURL;

        name.value = user.displayName;
        patientName.value = user.displayName;
    } else {
        router.push('/')
    }

})
const checkDiagnosis = () => {
    document.getElementById("appoint").style.display = "none";
    document.getElementById("checkDiag").style.display = "block";
}
const bookAppointment = () => {
    document.getElementById("appoint").style.display = "inherit";
    document.getElementById("checkDiag").style.display = "none";
}


const Phone = ref('');
const Appointdate = ref('');
const prediagnosis = ref('');
const age = ref('');
const choosedDocter = ref('');
const email = ref('');
const Submit = () => {
    const uid = auth.currentUser.uid;
    if (patientName.value == '' || Phone.value == '' || Appointdate.value == '' || prediagnosis.value == '' || age.value == '' || choosedDocter.value == '') {
        document.getElementById("confirmbox").innerHTML = "<span style='color: red;'>Please fill all the fields</span>"
        return;
    }
    setDoc(doc(db, "appointment", uid), {
        name: patientName.value,
        phone: Phone.value,
        age: age.value,
        Diagnosis: prediagnosis.value,
        date: Appointdate.value,
        specialist: choosedDocter.value,
        status:false,
        profile:auth.currentUser.photoURL
    }).then(() => {
        document.getElementById("confirmbox").innerHTML = "<span style='color: #00A300;'>Appointment Booked</span>"
        email.value="",Phone.value = "", Appointdate.value = "", prediagnosis.value = "", age.value = "", choosedDocter.value = ""
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });

}
</script>

<template>
    <div class="overlay" id="overl">
    <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
        <p id="overlay-para">Wait for few seconds to complete the Request </p>
    </div>
</div>
    <div class="space-y-1 px-2 pb-3 pt-4">
        <button @click="bookAppointment"
            :class="[true ? 'bg-indigo-600 text-white ml-3' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
            :aria-current="true ? 'page' : undefined"> Book Appointment </button>
        <button @click="checkDiagnosis"
            :class="[true ? 'bg-indigo-600 text-white ml-3' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
            :aria-current="true ? 'page' : undefined"> Check Diagnosis </button>
    </div>
    <div id="appoint">

        <div id="ft-form">
            <fieldset>
                <legend>Appointment request</legend>
                <label>
                    Name
                    <input type="text" v-model="patientName" name="name" required>
                </label>
                <div class="two-cols">
                    <label>
                        Email address
                        <input type="email" v-model="email" name="email" required>
                    </label>
                    <label>
                        Phone number
                        <input type="tel" v-model="Phone" name="phone">
                    </label>
                </div>
            </fieldset>
            <fieldset>

                <div class="two-cols">
                    <label>
                        Appointment Date
                        <input type="date" v-model="Appointdate" name="Appointment request" required>
                    </label>
                    <div class="inline">
                        <label>
                            <input type="hidden" name="Morning desired" value="no">
                            <input type="checkbox" name="Morning desired" value="yes">
                            Morning
                        </label>
                        <label>
                            <input type="hidden" name="Afternoon desired" value="no">
                            <input type="checkbox" name="Afternoon desired" value="yes">
                            Afternoon
                        </label>
                    </div>
                </div>
                <div class="two-cols">
                    <label>
                        Prior Diagnosis
                        <input type="text" v-model="prediagnosis" required>
                    </label>
                    <label>
                        Age
                        <input type="number" v-model="age">
                    </label>
                    <label>
                        specialist
                        <select v-model="choosedDocter">
                            <option value="">Please choose an option</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Neurologists">Neurologists</option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Diabetologist">Diabetologist</option>
                            <option value="General Medicine">General Medicine</option>
                        </select>
                    </label>
                </div>
            </fieldset>
            <div class="two-cols">
                <button @click="Submit"
                    :class="[true ? 'bg-indigo-600 text-white ml-5' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
                    :aria-current="true ? 'page' : undefined"> Submit </button>
                <p id="confirmbox"></p>
            </div>
        </div>
    </div>
    <div id="checkDiag">
        <div class="two-cols">
            <button @click="getrecords"
                :class="[true ? 'bg-indigo-600 text-white ml-5' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
                :aria-current="true ? 'page' : undefined"> Get Records </button>
                <button @click="enable"
                :class="[true ? 'bg-indigo-600 text-white ml-5' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
                :aria-current="true ? 'page' : undefined"> Enable Metamask </button>
        <p id="getRecPara"></p>
        </div>
    
    <div>
    <div class="p-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">Diagnosis</h3>
      
    </div>
    <div class="mt-6 p-10 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 " >Full name</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="patientName"></dd>
        </div>
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 " >DoB</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="dob"></dd>
        </div>
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900" >Patient Address</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="patiAdree"></dd>
        </div>
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Docter</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="docter"></dd>
        </div>
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="Location"></dd>
        </div>
        <div class="px-4 py-6 mx-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" id="descr"></dd></div>
       
      </dl>
    </div>
  </div>
</div>
</template>

<style scoped>
#overlay-para{
  font-family: 'Poppins', sans-serif !important;
  position: absolute;
    top: 59%;
    left: 39%;
}
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    visibility: hidden;
    backdrop-filter: blur(1px);
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 3.2px;
    border-color: rgba(96, 72, 72, 0.05);
    border-top-color:#5a67d8;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
#checkDiag {
    display: none;
}

#appoint {
    max-width: 600px;
    margin: 0 auto;
}

#ft-form {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15
}

#ft-form *,
#ft-form ::after,
#ft-form ::before {
    box-sizing: border-box
}

#ft-form input,
#ft-form select,
#ft-form textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0
}

#ft-form select {
    text-transform: none
}

#ft-form legend {
    padding: 0
}

#ft-form h2,
#ft-form p {
    margin: 0
}

#ft-form fieldset {
    margin: 0;
    padding: 0
}

#ft-form html {

    font-family: 'Poppins', sans-serif;
    line-height: 1.5
}

#ft-form body {
    font-family: inherit;
    line-height: inherit
}

#ft-form *,
#ft-form ::after,
#ft-form ::before {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb
}

#ft-form textarea {
    resize: vertical
}

#ft-form input::-moz-placeholder,
#ft-form textarea::-moz-placeholder {
    color: #9ca3af
}

#ft-form input:-ms-input-placeholder,
#ft-form textarea:-ms-input-placeholder {
    color: #9ca3af
}

#ft-form input::placeholder,
#ft-form textarea::placeholder {
    color: #9ca3af
}

#ft-form h2 {
    font-size: inherit;
    font-weight: inherit
}

#ft-form input,
#ft-form select,
#ft-form textarea {
    padding: 0;
    line-height: inherit;
    color: inherit
}

#ft-form [type=date],
#ft-form [type=email],
#ft-form [type=tel],
#ft-form [type=number],
#ft-form [type=text],
#ft-form select,
#ft-form textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0;
    padding-top: .5rem;
    padding-right: .75rem;
    padding-bottom: .5rem;
    padding-left: .75rem;
    font-size: 1rem;
    line-height: 1.5rem
}

#ft-form [type=date]:focus,
#ft-form [type=email]:focus,
#ft-form [type=tel]:focus,
#ft-form [type=text]:focus,
#ft-form select:focus,
#ft-form textarea:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgba(199, 210, 254, .5), 0 0 #0000;
    border-color: #2563eb
}

#ft-form input::-moz-placeholder,
#ft-form textarea::-moz-placeholder {
    color: #6b7280;
    opacity: 1
}

#ft-form input:-ms-input-placeholder,
#ft-form textarea:-ms-input-placeholder {
    color: #6b7280;
    opacity: 1
}

#ft-form input::placeholder,
#ft-form textarea::placeholder {
    color: #6b7280;
    opacity: 1
}

#ft-form select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right .5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact
}

#ft-form [type=checkbox],
#ft-form [type=radio] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    color: #2563eb;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px
}

#ft-form [type=checkbox] {
    border-radius: 0
}

#ft-form [type=radio] {
    border-radius: 100%
}

#ft-form [type=checkbox]:focus,
#ft-form [type=radio]:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgba(199, 210, 254, .5), 0 0 #0000;
}

#ft-form [type=checkbox]:checked,
#ft-form [type=radio]:checked {
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat
}

#ft-form [type=checkbox]:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")
}

#ft-form [type=radio]:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")
}

#ft-form [type=checkbox]:checked:focus,
#ft-form [type=checkbox]:checked:hover,
#ft-form [type=radio]:checked:focus,
#ft-form [type=radio]:checked:hover {
    border-color: transparent;
    background-color: currentColor
}

#ft-form [type=checkbox]:indeterminate {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat
}

#ft-form [type=checkbox]:indeterminate:focus,
#ft-form [type=checkbox]:indeterminate:hover {
    border-color: transparent;
    background-color: currentColor
}

#ft-form [type=file] {
    background: unset;
    border-color: inherit;
    border-width: 0;
    border-radius: 0;
    padding: 0;
    font-size: unset;
    line-height: inherit
}

#ft-form [type=file]:focus {
    outline: 1px auto -webkit-focus-ring-color
}

#ft-form fieldset {
    font-size: 100%;
    margin-top: 3rem;
    margin-bottom: 1.5rem
}

#ft-form fieldset:first-child {
    margin-top: 0
}

#ft-form fieldset>* {
    display: block;
    margin-bottom: 1.5rem
}

#ft-form fieldset> :last-child {
    margin-bottom: 0
}

#ft-form fieldset>.two-cols>* {
    display: block;
    margin-bottom: 1.5rem
}

#ft-form fieldset>.two-cols> :last-child {
    margin-bottom: 0
}

@media only screen and (min-width:640px) {
    #ft-form fieldset>.two-cols {
        display: flex;
        align-items: flex-end
    }

    #ft-form fieldset>.two-cols>* {
        display: block;
        margin-right: 1.5rem;
        margin-top: 0;
        margin-bottom: 0;
        flex: 1
    }

    #ft-form fieldset>.two-cols> :last-child {
        margin-right: 0
    }
}

#ft-form fieldset div>label {
    display: inline-flex;
    align-items: flex-start;
    margin-top: .5rem;
    width: 100%
}

#ft-form fieldset div>label:last-child {
    margin: .5rem 0 0 0
}

#ft-form fieldset div.inline {
    padding: .55rem 0 0;
    width: 100%
}

#ft-form fieldset div.inline>label {
    width: auto;
    margin-right: .5rem
}

#ft-form fieldset div.inline>label:last-child {
    margin-right: 0
}

#ft-form fieldset>.two-cols div.inline {
    padding: .55rem 0
}

#ft-form fieldset>legend {
    font-weight: 700;
    font-size: 120%;
    margin-bottom: 1rem
}

#ft-form fieldset>p {
    margin: 0
}

#ft-form [type=file] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0;
    padding-top: .5rem;
    padding-right: .75rem;
    padding-bottom: .5rem;
    padding-left: .75rem;
    font-size: 1rem;
    line-height: 1.5rem
}

#ft-form [type=file]:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgba(199, 210, 254, .5), 0 0 #0000;
    border-color: #2563eb
}

#ft-form [multiple],
#ft-form [type=date],
#ft-form [type=datetime-local],
#ft-form [type=email],
#ft-form [type=file],
#ft-form [type=month],
#ft-form [type=number],
#ft-form [type=password],
#ft-form [type=search],
#ft-form [type=tel],
#ft-form [type=text],
#ft-form [type=time],
#ft-form [type=url],
#ft-form [type=week],
#ft-form select,
#ft-form textarea {
    border-radius: .375rem;
    margin-top: .25rem;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, .05);
    border-color: #bbb;
    width: 100%
}

#ft-form [multiple] select,
#ft-form [type=date] select,
#ft-form [type=datetime-local] select,
#ft-form [type=email] select,
#ft-form [type=file] select,
#ft-form [type=month] select,
#ft-form [type=number] select,
#ft-form [type=password] select,
#ft-form [type=search] select,
#ft-form [type=tel] select,
#ft-form [type=text] select,
#ft-form [type=time] select,
#ft-form [type=url] select,
#ft-form [type=week] select,
#ft-form select select,
#ft-form textarea select {
    padding-right: 2.5rem
}

#ft-form [multiple]:focus,
#ft-form [type=date]:focus,
#ft-form [type=datetime-local]:focus,
#ft-form [type=email]:focus,
#ft-form [type=file]:focus,
#ft-form [type=month]:focus,
#ft-form [type=number]:focus,
#ft-form [type=password]:focus,
#ft-form [type=search]:focus,
#ft-form [type=tel]:focus,
#ft-form [type=text]:focus,
#ft-form [type=time]:focus,
#ft-form [type=url]:focus,
#ft-form [type=week]:focus,
#ft-form select:focus,
#ft-form textarea:focus {
    border-color: #bbb;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgba(199, 210, 254, .5), 0 0 #0000
}

#ft-form [type=checkbox],
#ft-form [type=radio] {
    color: #4f46e5;
    box-shadow: none;
    border-radius: .25rem;
    border-color: #bbb;
    margin-right: .5rem
}

#ft-form [type=checkbox]:focus,
#ft-form [type=radio]:focus {
    border-color: #bbb;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgba(199, 210, 254, .5), 0 0 #0000
}

#ft-form [type=radio] {
    border-radius: 100%
}

#ft-form .btns {
    text-align: right;
    margin-top: 3rem
}

#ft-form .btns>input[type=button],
#ft-form .btns>input[type=reset],
#ft-form .btns>input[type=submit] {
    display: inline-block;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, .05);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: .6rem;
    padding-bottom: .6rem;
    line-height: 1.25rem;
    border-width: 1px;
    border-radius: .375rem;
    border-color: #bbb;
    background-color: #fff;
    cursor: pointer;
    margin-left: .5rem;
    font-weight: 700
}

#ft-form .btns>input[type=button]:focus,
#ft-form .btns>input[type=reset]:focus,
#ft-form .btns>input[type=submit]:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: #bbb;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(199, 210, 254, .5), 0 0 #0000
}

#ft-form .btns>input[type=submit] {
    background-color: #f3f4f5;
    transition: background-color .1s
}

#ft-form .btns>input[type=submit]:hover {
    background-color: #f8f9fa
}
</style>
