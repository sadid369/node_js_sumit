const express = require("express");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");
//GET ALL THE TODOS
router.get("/", checkLogin, (req, res) => {
  Todo.find({})
    .populate("user", "name username -_id")
    .select({
      _id: 0,
      date: 0,
    })
    .limit()
    .then((data) => {
      res.status(200).json({
        result: data,
        message: "Todo was Get",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: `There was server side error ${err}` });
    });
});
//GET ACTIVE TODOS
router.get("/active", async (req, res) => {
  const todo = new Todo();
  try {
    const data = await todo.findActive();
    res.status(200).json({ message: `Todos GET successfully `, data });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});
//GET ACTIVE static TODOS
router.get("/js", async (req, res) => {
  try {
    const data = await Todo.findByJS();
    res.status(200).json({ message: `Todos GET successfully `, data });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});
router.get("/language/:id", async (req, res) => {
  try {
    const data = await Todo.find().byLanguage(req.params.id);
    res.status(200).json({ message: `Todos GET successfully `, data });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});

//GET A TODO BY ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Todo was Get",
    });
  } catch (error) {
    res.status(500).json({ error: `There was server side error ${err}` });
  }
});

//POST TODO
router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.userId,
  });
  try {
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res
      .status(200)
      .json({ message: `Todos was inserted successfully ${todo}` });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});
//POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  try {
    const data = await Todo.insertMany(req.body);
    res
      .status(200)
      .json({ message: `Todos were inserted successfully ${data}` });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});
//PUT  TODO
router.put("/:id", async (req, res) => {
  try {
    const data = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: `Todo Update successfully ${data}` });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});
//DELETE  TODO
router.delete("/:id", async (req, res) => {
  try {
    const data = await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: `Todo Delete successfully ${data}` });
  } catch (error) {
    res.status(500).json({ error: `There was a server side error ${error}` });
  }
});

module.exports = router;
