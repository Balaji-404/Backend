const countryModel = require("../../schema/base_tables/countries");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/country.json");

module.exports = {
  index: async (req, res) => {
    try {
      const countries = await countryModel.find({});
      returnMessage.successMessage(
        res,
        successMessages.getAllCountries,
        countries
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const country = countryModel.create({ ...req.body });
      returnMessage.successMessage(res, successMessages.addCountry, country);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const country = await countryModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showCountry, country);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const country = await countryModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(res, successMessages.updateCountry, country);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await countryModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const country = await countryModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.showCountry, country);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
