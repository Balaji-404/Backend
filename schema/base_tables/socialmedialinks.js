const mongoose = require("mongoose");

const SocialMediaLinkSchema = new mongoose.Schema({
  name: String,
  link: String,
});

module.exports = mongoose.model("socialmedialink", SocialMediaLinkSchema);
