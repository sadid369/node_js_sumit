/*
*Title: Worker library

*/
// Dependencies
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");

const worker = {};

//lookup all the checks
worker.gatherAllChecks = () => {
  // get all the checks
  data.list("checks", (err, checks) => {
    if (!err && checks && checks.length > 0) {
      checks.forEach((check) => {
        //read the check data
        data.read("checks", check, (err1, originalCheckData) => {
          if (!err1 && originalCheckData) {
            //pass the data to the check validator
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
            console.log("Error: reading one of the checks data!");
          }
        });
      });
    } else {
      console.log("Error could not find any checks to process");
    }
  });
};
//validate individual  check data
worker.validateCheckData = (originalData) => {
  let originalCheckData = originalData;
  if (originalCheckData && originalCheckData.id) {
    originalCheckData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";
    originalCheckData.lastChecked =
      typeof originalCheckData.lastChecked === "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : false;
    worker.performCheck(originalCheckData);
  } else {
    console.log("Error: check was invalid or not properly formatted!");
  }
};
//perform check
worker.performCheck = (originalCheckData) => {
  // parse the hostname
};
//timer to execute the worker process once per minute
worker.loop = () => {
  setInterval(() => {
    worker.gatherAllChecks();
  }, 1000 * 60);
};

// start the worker
worker.init = () => {
  // execute all the checks
  worker.gatherAllChecks();

  //call the loop so that checks continue
  worker.loop();
};
//export
module.exports = worker;
