const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  name: String,
  country:{
    type:mongoose.Types.ObjectId,
    ref:'country'
  }
});

module.exports = mongoose.model("state", StateSchema);
