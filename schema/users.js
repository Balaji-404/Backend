const mongoose = require("mongoose");

require("../schema/roles");

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  firstName: String,
  lastName: String,
  middleName: String,
  mobile: String,
  dob: Date,
  salt: String,
  gender: String,
  role: {
    type: mongoose.Types.ObjectId,
    ref: "role",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
