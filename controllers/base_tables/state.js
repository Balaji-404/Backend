const stateModel = require("../../schema/base_tables/states");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/state.json");

module.exports = {
  index: async (req, res) => {
    try {
      const states = await stateModel.find({});
      returnMessage.successMessage(res, successMessages.getAllStates, states);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const state = await stateModel.create({ ...req.body });
      returnMessage.successMessage(
        res,
        successMessages.addState,
        state.populate("country", "name")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const state = await stateModel
        .findOne({ _id: req.params["id"] })
        .populate("country", "name");
      returnMessage.successMessage(res, successMessages.showState, state);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const state = await stateModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(
        res,
        successMessages.updateState,
        state.populate("name", "country")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await stateModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteState);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const state = await stateModel
        .findOne({ _id: req.params["id"] })
        .populate("country", "name");
      returnMessage.successMessage(res, successMessages.showState, state);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
