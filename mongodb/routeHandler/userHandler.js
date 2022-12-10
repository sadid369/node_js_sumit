const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");
const User = new mongoose.model("User", userSchema);

//Signup
//01719058888
//mujahid
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    const data = await newUser.save();
    res.status(200).json({ message: `Signup was Successful `, data });
  } catch (error) {
    res.status(500).json({ error: `Signup Failed ${error}` });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ user: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "100h",
          }
        );
        res
          .status(200)
          .json({ access_token: token, message: "Login Successful" });
      } else {
        res.status(401).json({ error: `Authentication Failed ` });
      }
    } else {
      res.status(401).json({ error: `Authentication Failed ` });
    }
  } catch (error) {
    res.status(401).json({ error: `Authentication Failed `, error });
  }
});

module.exports = router;
