import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
/* import web3 from 'web3'
import configuration from '../../build/contracts/MedicalRecord.json'
const web3 = new web3(web3.givenProvider || "ws://localhost:8545");
const CONTRACT_ADDRESS=configuration.networks[5777].address;
const CONTRACT_ABI=configuration.abi;

const contact =new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
let account
const main=async ()=>{web3.eth.requestAccounts();
    account=accounts[0];
    console.log(account);
}
main(); */

createApp(App).mount('#app')

