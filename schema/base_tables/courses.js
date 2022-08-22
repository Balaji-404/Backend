const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  stream: {
    type: mongoose.Types.ObjectId,
    ref: "stream",
  },
});

module.exports = mongoose.model("course", courseSchema);
