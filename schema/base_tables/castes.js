const mongoose = require("mongoose");

const CasteSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("caste", CasteSchema);
