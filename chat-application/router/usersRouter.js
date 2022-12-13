//external imports
const express = require("express");
//internal export
const avatarUpload = require("../middlewares/users/avatarUpload");
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);
//add user
router.post("/", avatarUpload);

module.exports = router;
