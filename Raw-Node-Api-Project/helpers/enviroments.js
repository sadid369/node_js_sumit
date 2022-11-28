/*

Title: Environments

*/

//dependencies

//module scaffolding

const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "hdhdhslkahdfaefhblklszg",
  maxChecks: 5,
  twilio: {
    fromPhone: "+1500555006",
    accountSid: "AC983d3d8bc2bed31e743d84b015a56210",
    authToken: "a6ec161464833300528ceebbbdc1bfd9",
  },
};
environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "zjbfjbafbaFbabfbfbf",
  maxChecks: 5,
  twilio: {
    fromPhone: "+1500555006",
    accountSid: "AC983d3d8bc2bed31e743d84b015a56210",
    authToken: "a6ec161464833300528ceebbbdc1bfd9",
  },
};

//determine which environment was passed

const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// Export corresponding environment object

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;
//export modules
module.exports = environmentToExport;
