// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecord {
    
    struct Patient {
        address patientAddress;
        string fullName;
        string dateOfBirth;
        string insuranceProvider;
    }
    mapping(address => Patient) patients;

    struct Record {
        address recordAddress;
        address patientAddress;
        string recordHash;
        string recordType;
        string recordTimestamp;
    }
    mapping(address => Record) records;

    // Add a new patient
    function addPatient(address _patientAddress, string memory _fullName, string memory _dateOfBirth, string memory _insuranceProvider) public returns (string memory){
        //require(msg.sender == _patientAddress);
        patients[_patientAddress] = Patient(_patientAddress, _fullName, _dateOfBirth, _insuranceProvider);
        return _fullName;
    }

    function addRecord(address _patientAddress, string memory _recordHash, string memory _recordType, string memory _recordTimestamp) public returns  (string memory,string memory) {
        
        require(patients[_patientAddress].patientAddress == _patientAddress);
      
        records[ patients[_patientAddress].patientAddress] = Record(patients[_patientAddress].patientAddress, _patientAddress, _recordHash, _recordType, _recordTimestamp);
        return (_recordTimestamp,patients[_patientAddress].fullName);
    }

    function getRecord(address _patientAddress) public view returns (address, address, string memory, string memory, string memory) {

        require(patients[_patientAddress].patientAddress == _patientAddress);
       
                return (records[_patientAddress].recordAddress, records[_patientAddress].patientAddress, records[_patientAddress].recordHash, records[_patientAddress].recordType, patients[_patientAddress].fullName);
            
    
    }
}