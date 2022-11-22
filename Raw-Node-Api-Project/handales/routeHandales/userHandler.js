/**
 Title: User Handler
 */
//dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const { user } = require("../../routes");
// Modules Scaffolding

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(200, {
      message: "Request Not Accepted",
    });
  }
};
handler._user = {};
handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : false;
  console.log(firstName, lastName, password, phone, tosAgreement);
  if (firstName && lastName && phone && password && tosAgreement) {
    //Make sure that user doesn't already exists
    data.read("users", phone, (err1, user) => {
      if (err1) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User was created successfully",
            });
          } else {
            callback(500, {
              error: "Could not create user",
            });
          }
        });
      } else {
        callback(500, {
          error: "Error There was a problem in server side",
        });
      }
    });
  } else {
    callback(400, {
      error: `You have a problem in your request`,
    });
  }
};
//@TODO: Check Authentication
handler._user.get = (requestProperties, callback) => {
  // check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    //lookup the user
    data.read("users", phone, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, { error: "Requested user was not found" });
      }
    });
  } else {
    callback(404, { error: "Requested user was not found" });
  }
};
//@TODO: Check Authentication
handler._user.put = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  if (phone) {
    if (firstName || lastName || password) {
      //lookup the user
      data.read("users", phone, (err2, uData) => {
        const userData = { ...parseJSON(uData) };
        if (!err2 && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }
          // store or update to database
          data.update("users", phone, userData, (err1) => {
            if (!err1) {
              callback(200, { message: "User was updated successfully!" });
            } else {
              callback(500, {
                error: "There was a problem in server side",
              });
            }
          });
        } else {
          callback(400, {
            error: "You Have problem in your in request!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You Have problem in your in request!",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number. Please try again!",
    });
  }
};
//@TODO: Check Authentication
handler._user.delete = (requestProperties, callback) => {
  // check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    data.read("users", phone, (err1, userData) => {
      if (!err1 && userData) {
        data.delete("users", phone, (err2) => {
          if (!err2) {
            callback(200, { message: "User successfully deleted!" });
          } else {
            callback(500, {
              message: "There was a server side error!",
            });
          }
        });
      } else {
        callback(500, {
          error: "There was a server side error!",
        });
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in your request",
    });
  }
};

module.exports = handler;
