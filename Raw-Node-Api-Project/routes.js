/*
Title: Routes
*/
//dependencies

const { sampleHandler } = require("./handales/routeHandales/sampleHandalers");
const { userHandler } = require("./handales/routeHandales/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
