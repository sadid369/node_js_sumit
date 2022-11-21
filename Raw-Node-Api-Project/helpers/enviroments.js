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
};
environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "zjbfjbafbaFbabfbfbf",
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
