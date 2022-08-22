const casteModel = require("../../schema/base_tables/castes");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/caste.json");

module.exports = {
  index: async (req, res) => {
    try {
      const castes = await casteModel.find({});
      returnMessage.successMessage(res, successMessages.getAllCastes, castes);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const caste = casteModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addCaste, caste);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const caste = await casteModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showCaste, caste);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const caste = await casteModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateCaste, caste);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await casteModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteCaste);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const caste = await casteModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showCaste, caste);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
