const mongoose = require("mongoose");

const ReligionSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("religion", ReligionSchema);