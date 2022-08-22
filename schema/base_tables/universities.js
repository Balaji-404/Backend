const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("university", universitySchema);