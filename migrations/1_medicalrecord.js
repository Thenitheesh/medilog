const medicalrecord=artifacts.require("MedicalRecord");

module.exports = function(deployer) {
  deployer.deploy(medicalrecord);
};