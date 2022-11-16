/*
*Title: Uptime Monitoring Application

*/
// Dependencies
const http = require("http");

const { handleReqRes } = require("./helpers/handleReqRes");
//App object - Module scaffolding

const app = {};

//configuration
app.config = {
  port: 3000,
};

// create server

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(app.config.port, () => {
    console.log(`Listening to port ${app.config.port}`);
  });
};

// Handle Request Response

app.handleReqRes = handleReqRes;
app.createServer();
