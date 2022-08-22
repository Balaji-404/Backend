const streamModel = require("../../schema/base_tables/streams");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/stream.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.streamNameRequired).exists(),
    body("name", errorMessages.streamNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await streamModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.streamAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.streamIdRequired).exists(),
    param("id", errorMessages.streamIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const stream = await streamModel.findById(id);
        if (!stream) return Promise.reject(errorMessages.streamNotExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const updateRule = () => [...paramRule(), ...bodyRule()];

module.exports = {
  bodyRule,
  paramRule,
  updateRule,
};
