<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../main.js'
import { useRouter } from 'vue-router';
import Web3 from 'web3/dist/web3.min.js'
import configuration from '../MedicalRecord.json'
import { Buffer } from 'buffer'
import { create, urlSource } from 'ipfs-http-client'
const CONTRACT_ADDRESS = configuration.networks[5777].address;
const CONTRACT_ABI = configuration.abi;
const projectId = "2LDvBN1c4nepjCmxjQs8xBBI6ZX"
const projectSecret = "a5994954fe63db448795c03ee163442c"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
console.log(auth)
const Ipfs = new create({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth,
  },
});

const upload = async () => {
  const file = document.getElementById('ipfsfile')
  console.log(Ipfs)
  const result = await Ipfs.add(file.files[0])
  console.log(result.cid)

}
const web3 = new Web3(Web3.givenProvider || 'wss://127.0.0.1:8545')

console.log({ web3 })
console.log(CONTRACT_ADDRESS)
var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const enable = () => {
  ethereum.request({ method: 'eth_requestAccounts' });
};

const addPatients = () => {
  web3.eth.getAccounts().then(async function (accounts) {
    let address = document.getElementById('acc-address').value
    let fullname = document.getElementById('first-name').value
    let date = document.getElementById('date').value
    let location = document.getElementById('street-address').value + " " + document.getElementById('city').value + " " + document.getElementById('region').value + " " + document.getElementById('postal-code').value
    contract.methods.addPatient(address, fullname, date, location).send({ from: accounts[0] }).then(async function (){
    let classList = document.getElementById('added').classList
  classList.remove('text-gray-50')
  classList.toggle('text-green-600')}
    )
  })
   

  
};
const router = useRouter();
const addrecord = () => {
  web3.eth.getAccounts().then(async function (accounts) {
    let address = document.getElementById('acc-address').value
    let desc = document.getElementById('diagnosis').value
    let docname = document.getElementById('docter-name').value
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    contract.methods.addRecord(address, desc, docname, date).send({ from: accounts[0] }).then(async function (){
      router.push('/home')
    }
    )
    
  })
};
const getrecords = () => {
  web3.eth.getAccounts().then(async function (accounts) {
    let address = accounts[0]
    contract.methods.getRecord(address).call().then(function (result) {
      console.log(result)
    });
  })
}
web3.eth.getAccounts().then(async function (accounts) {
  console.log(accounts);
})
</script>

<template>
  <!-- <div>
    <button @click="enable">enable metamask</button>
    <button @click="getrecords">get records</button>
    {{ contractResult }}
    <input type="file" id="ipfsfile">
    <button @click="upload">submit</button>
  </div>
   -->

  <div class="hidden sm:block" aria-hidden="true">
    <div class="pt-4">
      <button  @click="enable"
                class="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Enable Metamask</button>
    </div>
  </div>

  <div class=" sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-6 text-gray-900">New patient record</h3>
          <p class="mt-1 text-sm text-gray-600">Add the relavent information before submitting</p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="first-name" v-model="fullname" id="first-name" autocomplete="given-name"
                    class="mt-1 ml-1 h-7 font-sans block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-black-500 dark:text-black-400" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input name="start" type="text" id="date"
                    class="mt-2.5 bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Date">
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Account address</label>
                  <input type="text" name="email-address" id="acc-address" 
                    class="mt-1 h-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <select id="country" name="country" autocomplete="country-name"
                    class="mt-1  block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>India</option>

                  </select>
                </div>

                <div class="col-span-6">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                  <input type="text" name="street-address" id="street-address" autocomplete="street-address"
                    class="mt-1 h-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" id="city" autocomplete="address-level2"
                    class="mt-1 h-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <input type="text" name="region" id="region" autocomplete="address-level1"
                    class="mt-1 h-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                  <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                    class="mt-1 h-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="col-span-full">
                  <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Diagonsis</label>
                  <div class="mt-2">
                    <textarea id="diagnosis" name="about" rows="8"
                      class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"></textarea>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Write the intial Diagonsis.</p>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Docter</label>
                  <input type="text" name="doc-name" id="docter-name" autocomplete="given-name"
                    class="mt-1 ml-1 h-7 font-sans block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>

            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <p class="mb-2 text-sm leading-6 text-gray-600">Add patient before submitting the Diagnosis.</p>
              <p id="added" class="md:flex text-sm  text-gray-50 font-medium">Patient Added</p>
              <button  @click="addPatients"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Patient</button>
                <button  @click="addrecord"
                class="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
            </div>
          </div>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <router-view />
</template>

<style scoped>
.input {
  font-family: 'Poppins', sans-serif !important;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}</style>