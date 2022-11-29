/*
*Title: Server library

*/
// Dependencies
const http = require("http");
const environment = require("../helpers/enviroments");
const { handleReqRes } = require("../helpers/handleReqRes");
// const data = require("./lib/data");
// const { sendTwilioSms } = require("./helpers/notifications");
//App object - Module scaffolding

const server = {};
//@TODO: remove letter
// sendTwilioSms("01710450779", "Hello World", (err) => {
//   console.log(`This is the error`, err);
// });
// create server

server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);

  createServerVariable.listen(environment.port, () => {
    console.log(`Listening to port ${environment.port}`);
  });
};

// Handle Request Response

server.handleReqRes = handleReqRes;
server.init = () => {
  server.createServer();
};
//export
module.exports = server;
