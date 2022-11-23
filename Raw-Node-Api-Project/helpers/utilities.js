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
//create random string
utilities.createRandomString = (strLength) => {
  let length =
    typeof strLength === "number" && strLength > 0 ? strLength : false;
  if (length) {
    let possibleCharacters = "abcdefghijklmnopqrstuvwxyz1234567890";
    let output = "";
    for (let i = 0; i < length; i++) {
      let randomCharacters = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      output += randomCharacters;
    }
    return output;
  } else {
    return false;
  }
};

//export modules
module.exports = utilities;
