/*
*Title: Uptime Monitoring Application

*/
// Dependencies
const http = require("http");
const environment = require("./helpers/enviroments");
const { handleReqRes } = require("./helpers/handleReqRes");
const data = require("./lib/data");
const { sendTwilioSms } = require("./helpers/notifications");
//App object - Module scaffolding

const app = {};
//@TODO: remove letter
sendTwilioSms("01710450779", "Hello World", (err) => {
  console.log(`This is the error`, err);
});
// create server

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(environment.port, () => {
    console.log(`Listening to port ${environment.port}`);
  });
};

// Handle Request Response

app.handleReqRes = handleReqRes;
app.createServer();
