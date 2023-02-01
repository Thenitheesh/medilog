<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Web3 from 'web3/dist/web3.min.js'
import configuration from '../../build/contracts/MedicalRecord.json'

const CONTRACT_ADDRESS=configuration.networks[5777].address;
const CONTRACT_ABI=configuration.abi;


const web3 = new Web3(Web3.givenProvider || 'wss://127.0.0.1:8545')

console.log({ web3 })
console.log(CONTRACT_ADDRESS)
var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const enable=()=>{
ethereum.request({ method: 'eth_requestAccounts' });
};
const connect=()=>{
  web3.eth.getAccounts().then(async function(accounts) {
    let   address=accounts[0]
  contract.methods.addPatient(address,'chandra','010101','hospiacctal').send({from: accounts[0]}) 
console.log('connected')
} )
};
//let   address= web3.eth.getAccounts().accounts[0]
const addrecord=()=>{
  web3.eth.getAccounts().then(async function(accounts) {
    let   address=accounts[0]
  contract.methods.addRecord(address,'ldncla','img','789878').send({from: accounts[0]}) 
console.log('added th record')
} )
};
const getrecords=()=>{
  web3.eth.getAccounts().then(async function(accounts) {
    let   address=accounts[0]
  contract.methods.getRecord(address).call().then(function(result) {
    console.log(result)
  });})
}
web3.eth.getAccounts().then(async function(accounts) {
  console.log(accounts);})
</script>

<template>
  <div>
    <button @click="enable">enable metamask</button>
    <button @click="connect">add patiest</button>
    <button @click="addrecord">addrecord </button>
    <button @click="getrecords">get records</button>
    {{ contractResult }}
   
  
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
