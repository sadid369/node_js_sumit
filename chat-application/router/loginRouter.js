//external imports
const express = require("express");
//internal export
const { getLogin } = require("../controller/loginController");

const router = express.Router();

//login page

router.get("/", getLogin);

module.exports = router;
