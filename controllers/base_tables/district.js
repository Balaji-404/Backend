const districtModel = require("../../schema/base_tables/districts");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/district.json");

module.exports = {
  index: async (req, res) => {
    try {
      const districts = await districtModel.find({})
      returnMessage.successMessage(
        res,
        successMessages.getAllDistricts,
        districts
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const district = await districtModel.create({ ...req.body });
      returnMessage.successMessage(
        res,
        successMessages.addDistrict,
        district.populate("state", "name")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const district = await districtModel
        .findOne({ _id: req.params["id"] })
        .populate("state", "name");
      returnMessage.successMessage(res, successMessages.showDistrict, district);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const district = await districtModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(
        res,
        successMessages.updateDistrict,
        district.populate("name", "state")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await districtModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteDistrict);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const district = await districtModel
        .findOne({ _id: req.params["id"] })
        .populate("state", "name");
      returnMessage.successMessage(res, successMessages.showDistrict, district);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
