const socialmedialinkModel = require("../../schema/base_tables/socialmedialinks");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/socialmedialink.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.socialMediaLinkNameRequired).exists(),
    body("link",errorMessages.socialMediaLinkRequired).exists(),
    body("link",errorMessages.socialMediaLinkUrl).isURL(),
    body("name", errorMessages.socialMediaLinkNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("link").custom(async (name) => {
      try {
        const isNameTaken = await socialmedialinkModel.findOne({ link });
        if (isNameTaken)
          return Promise.reject(errorMessages.socialMediaLinkAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.socialMediaLinkIdRequired).exists(),
    param("id", errorMessages.socialMediaLinkIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const socialmedialink = await socialmedialinkModel.findById(id);
        if (!socialmedialink) return Promise.reject(errorMessages.socialMediaLinkNotExists);
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