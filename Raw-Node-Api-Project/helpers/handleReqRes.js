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
const { parseJSON } = require("../helpers/utilities");
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  //request handle
  //get the url and perse it
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  const chosenHandaler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  // if (routes[trimmedPath] === trimmedPath) {
  // }
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();

    requestProperties.body = parseJSON(realData);
    chosenHandaler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
    //response handle
  });
};

module.exports = handler;
