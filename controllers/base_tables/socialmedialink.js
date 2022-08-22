const socialmedialinkModel = require("../../schema/base_tables/socialmedialinks");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/socialmedialink.json");

module.exports = {
  index: async (req, res) => {
    try {
      const socialmedialinks = await socialmedialinkModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllSocialMediaLinks,
        socialmedialinks
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const socialmedialink = socialmedialinkModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addSocialMediaLink, socialmedialink);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const socialmedialink = await socialmedialinkModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showSocialMediaLink, socialmedialink);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const socialmedialink = await socialmedialinkModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateSocialMediaLink, socialmedialink);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await socialmedialinkModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteSocialMediaLink);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const socialmedialink = await socialmedialinkModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showSocialMediaLink, socialmedialink);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};