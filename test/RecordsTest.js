const Record=artifacts.require("./contracts/MedicalRecord");
const assert =require('assert');
const { it } = require('node:test');


contract("Record",accounts=>{
    it('shold add a patient',async()=>{
    const instance= await Record.deployed();
    await instance.addPatient(0x1234567890123456789012345678901234567890,'nitheesh','8985320','hospital');


});

});