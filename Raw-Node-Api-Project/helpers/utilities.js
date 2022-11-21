/*

Title: Utilities

*/

//dependencies
const crypto = require("crypto");
const enviroments = require("./enviroments");
//module scaffolding

const utilities = {};

//parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }
  return output;
};
//hash String
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", enviroments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};
//export modules
module.exports = utilities;
