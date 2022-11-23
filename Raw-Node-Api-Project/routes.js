/*
Title: Routes
*/
//dependencies

const { sampleHandler } = require("./handales/routeHandales/sampleHandalers");
const { userHandler } = require("./handales/routeHandales/userHandler");
const { tokenHandler } = require("./handales/routeHandales/tokenHandaler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
