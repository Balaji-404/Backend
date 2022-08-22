const Role = require("../schema/roles");
const returnMessages = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  index: async (req,res) => {
    try{
    let roles = await Role.find({})
    returnMessages.successMessage(res, messages.successMessages.getRoles, roles)
    }catch(error){
      returnMessages.errorMessage(res,error)
    }
  },
  create: async (req, res) => {
    try {
      let { name, description, permissions } = req.body;
      const role = new Role({
        name,
        description,
        permissions,
      });
      await role.save().then((data) => {
        returnMessages.successMessage(
          res,
          messages.successMessages.addRole,
          data
        );
      });
    } catch (error) {
      returnMessages.errorMessage(res, error);
    }
  },
};