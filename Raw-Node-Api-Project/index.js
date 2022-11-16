/*
*Title: Uptime Monitoring Application

*/
// Dependencies
const http = require("http");
const url = require("url");

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

app.handleReqRes = (req, res) => {
  //request handle
  //get the url and perse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  console.log(headersObject);
  //response handle
  res.end("Hello World");
};

app.createServer();
