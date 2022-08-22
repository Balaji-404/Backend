const mongoose = require("mongoose");

const SkillCategorySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("skillcategory", SkillCategorySchema);