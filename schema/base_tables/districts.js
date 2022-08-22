const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: String,
  state: {
    type: mongoose.Types.ObjectId,
    ref: "state",
  },
});

module.exports = mongoose.model("district", districtSchema);
