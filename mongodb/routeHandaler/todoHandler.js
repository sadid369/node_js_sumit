const express = require("express");
const router = express.Router();
const todoSchema = require("../schemas/tdoSchema");
const mongoose = require("mongoose");
const Todo = new mongoose.model("Todo", todoSchema);

//GET ALL THE TODOS
router.get("/", async (req, res) => {});

//GET A TODO BY ID
router.get("/:id", async (req, res) => {});

//POST TODO
router.post("/", async (req, res) => {});
//POST MULTIPLE TODO
router.post("/all", async (req, res) => {});
//PUT  TODO
router.put("/:id", async (req, res) => {});
//DELETE  TODO
router.delete("/:id", async (req, res) => {});

module.exports = router;
