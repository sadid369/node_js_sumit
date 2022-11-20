/*
*Title: Uptime Monitoring Application

*/
// Dependencies
const http = require("http");
const environment = require("./helpers/enviroments");
const { handleReqRes } = require("./helpers/handleReqRes");
//App object - Module scaffolding

const app = {};

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
