const mongoose = require("mongoose");

const todoScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//instance methods
todoScheme.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "inactive" });
  },
};
//static methods
todoScheme.statics = {
  findByJS: function () {
    return this.find({ title: /test 11/i });
  },
};
//query helpers
todoScheme.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};
module.exports = todoScheme;
