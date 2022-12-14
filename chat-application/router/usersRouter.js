//external imports
const express = require("express");

//internal export
const avatarUpload = require("../middlewares/users/avatarUpload");
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

//Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);
//add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
