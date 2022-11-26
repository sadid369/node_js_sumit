/*
Title: Routes
*/
//dependencies

const { sampleHandler } = require("./handales/routeHandales/sampleHandalers");
const { userHandler } = require("./handales/routeHandales/userHandler");
const { tokenHandler } = require("./handales/routeHandales/tokenHandaler");
const { checkHandler } = require("./handales/routeHandales/checkHandaler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
