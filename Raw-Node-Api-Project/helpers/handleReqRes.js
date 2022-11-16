/*
Title: Handle Request Response
*/
//dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handales/routeHandales/notFoundHandaler");

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  //request handle
  //get the url and perse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const decoder = new StringDecoder("utf-8");
  const chosenHandaler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  let realData = "";
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    res.end("Hello World");
  });
  //response handle
};

module.exports = handler;
