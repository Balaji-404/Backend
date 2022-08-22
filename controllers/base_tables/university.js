const universityModel = require("../../schema/base_tables/universities");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/university.json");

module.exports = {
  index: async (req, res) => {
    try {
      const universities = await universityModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllUniversities,
        universities
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const university = universityModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.adduniversity, university);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const university = await universityModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showuniversity, university);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const university = await universityModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateuniversity, university);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await universityModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteuniversity);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const university = await universityModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showuniversity, university);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
