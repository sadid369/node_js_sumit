const express = require("express");
const router = express.Router();
const todoSchema = require("../schemas/tdoSchema");
const mongoose = require("mongoose");
const Todo = new mongoose.model("Todo", todoSchema);

//GET ALL THE TODOS
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      date: 0,
    })
    .limit(2)
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

//GET A TODO BY ID
router.get("/:id", (req, res) => {
  Todo.find({ _id: req.params.id })

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

//POST TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: "There was server side error" });
    } else {
      res.status(200).json({ message: "Todo was inserted successfully" });
    }
  });
});
//POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({ message: "Todos were inserted successfully " });
    }
  });
});
//PUT  TODO
router.put("/:id", (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) {
        res.status(500).json({ error: "There was a server side error" });
      } else {
        console.log(data);
        res.status(200).json({ message: "Success " });
      }
    }
  );
});
//DELETE  TODO
router.delete("/:id", async (req, res) => {
  Todo.deleteOne({ _id: req.params.id })

    .then((data) => {
      res.status(200).json({
        result: data,
        message: "Todo was Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: `There was server side error ${err}` });
    });
});

module.exports = router;
