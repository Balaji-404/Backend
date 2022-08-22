const religionModel = require("../../schema/base_tables/religions");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/religion.json");

module.exports = {
  index: async (req, res) => {
    try {
      const religions = await religionModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllReligions,
        religions
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const religion = religionModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addReligion, religion);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const religion = await religionModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showReligion, religion);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const religion = await religionModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateReligion, religion);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await religionModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteReligion);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const religion = await religionModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showReligion, religion);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};