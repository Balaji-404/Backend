const familyincomegroupModel = require("../../schema/base_tables/familyincomegroups");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/familyincomegroup.json");

module.exports = {
  index: async (req, res) => {
    try {
      const familyincomegroups = await familyincomegroupModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllFamilyIncomeGroups,
        familyincomegroups
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const familyincomegroup = familyincomegroupModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addFamilyIncomeGroup, familyincomegroup);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const familyincomegroup = await familyincomegroupModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showFamilyIncomeGroup, familyincomegroup);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const familyincomegroup = await familyincomegroupModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateFamilyIncomeGroup, familyincomegroup);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await familyincomegroupModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteFamilyIncomeGroup);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const familyincomegroup = await familyincomegroupModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showFamilyIncomeGroup, familyincomegroup);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};