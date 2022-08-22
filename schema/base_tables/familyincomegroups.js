const mongoose = require("mongoose");

const FamilyIncomeGroupSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("familyincomegroup", FamilyIncomeGroupSchema);