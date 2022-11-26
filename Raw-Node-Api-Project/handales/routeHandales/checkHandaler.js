/**
 Title: Check Handler
 */
//dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const { user } = require("../../routes");
const tokenHandler = require("./tokenHandaler");
const { maxChecks } = require("../../helpers/enviroments");
// Modules Scaffolding

const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(200, {
      message: "Request Not Accepted",
    });
  }
};
handler._check = {};
handler._check.post = (requestProperties, callback) => {
  //validate inputs
  const protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) >= 0
      ? requestProperties.body.protocol
      : false;
  const url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;
  const method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) >= 0
      ? requestProperties.body.method
      : false;
  const successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;
  const timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;
  console.log(protocol, url, method, successCodes, timeoutSeconds);
  if (protocol && url && method && successCodes && timeoutSeconds) {
    const token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;
    data.read("tokens", token, (err1, tokenData) => {
      if (!err1 && tokenData) {
        let userPhone = parseJSON(tokenData).phone;
        //lookup the user data
        data.read("users", userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                let userObject = parseJSON(userData);
                let userChecks =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];
                if (userChecks.length < maxChecks) {
                  let checkId = createRandomString(20);
                  let checkObject = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCodes,
                    timeoutSeconds,
                  };
                  //save the object
                  data.create("checks", checkId, checkObject, (err3) => {
                    if (!err3) {
                      //add check id to the users object
                      userObject.checks = userChecks;
                      userObject.checks.push(checkId);
                      //save the new user data
                      data.update("users", userPhone, userObject, (err4) => {
                        if (!err4) {
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            error: "There was a problem in the server side!",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "There was a problem in the server side!",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "User has already reached max check limit!",
                  });
                }
              } else {
                callback(403, { error: "Authentication Problem" });
              }
            });
          } else {
            callback(403, { error: "User not found" });
          }
        });
      } else {
        callback(403, { error: "Authentication Problem" });
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request" });
  }
};

handler._check.get = (requestProperties, callback) => {};

handler._check.put = (requestProperties, callback) => {};

handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
