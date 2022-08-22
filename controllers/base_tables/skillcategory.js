const skillcategoryModel = require("../../schema/base_tables/skillcategories");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/skillcategory.json");

module.exports = {
  index: async (req, res) => {
    try {
      const skillcategories = await skillcategoryModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllSkillCategories,
        skillcategories
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const skillcategory = skillcategoryModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addSkillCategory, skillcategory);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const skillcategory = await skillcategoryModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showSkillCategory, skillcategory);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const skillcategory = await skillcategoryModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateSkillCategory, skillcategory);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await skillcategoryModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteSkillCategory);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const skillcategory = await skillcategoryModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showSkillCategory, skillcategory);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};