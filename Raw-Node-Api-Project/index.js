/*
*Title: Uptime Monitoring Application

*/
// Dependencies
const http = require("http");
const environment = require("./helpers/enviroments");
const { handleReqRes } = require("./helpers/handleReqRes");
const data = require("./lib/data");
//App object - Module scaffolding

const app = {};
//testing file system
// @TODO: poremuche dibo
// data.delete(
//   "test",
//   "newFile",

//   (err) => {
//     console.log(err);
//   }
// );

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
