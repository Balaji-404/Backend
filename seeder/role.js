const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const connecTOMongo = () => {
  dbConnection(process.env.MONGO_URI);
};
connecTOMongo();

const roleModel = require("../schema/roles");

const {
  commonPermissions,
  superPermissions,
  heiPermissions,
} = require("./data/roles.json");

const seedRole = [
  {
    name: "SuperAdmin",
    description: "Role for super admin",
    permissions: [...commonPermissions, ...superPermissions],
  },
  {
    name: "User",
    description: "Role for User",
    permissions: [...commonPermissions],
  },
  {
    name: "HEI",
    description: "Roles for Higher Education Institutes",
    permissions: [...commonPermissions, ...heiPermissions],
  },
  {
    name: "AICTE-Admin",
    description: "Roles for Higher Education Institutes",
    permissions: [...commonPermissions, ...heiPermissions],
  },
];

const importRole = async () => {
  try {
    await roleModel.deleteMany({});
    await roleModel.insertMany(seedRole);
    console.log("Roles imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

importRole().then(() => {
  mongoose.connection.close();
});
