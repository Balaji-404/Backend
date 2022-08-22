const streamModel = require("../../schema/base_tables/streams");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/stream.json");

module.exports = {
  index: async (req, res) => {
    try {
      const streams = await streamModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllStreams,
        streams
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const stream = streamModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addStream, stream);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const stream = await streamModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showStream, stream);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const stream = await streamModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateStream, stream);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await streamModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteStream);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const stream = await streamModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showStream, stream);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};