const mongoose = require("mongoose");
const softDelete = require("mongoose-delete");
const UserVerification = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiredAt: Date,
});
UserVerification.plugin(softDelete);

module.exports = mongoose.model("userverification", UserVerification);
