const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "data");

require("dotenv").config();
const dbConnection = require("../utils/DBconnection");

dbConnection(process.env.MONGO_URI);

const importCountries = require("./base_tables/country");
const importStates = require("./base_tables/state");
const importDistricts = require("./base_tables/district");
const importStreams = require("./base_tables/stream");
const importCourses = require("./base_tables/course");
const importFIG = require("./base_tables/familyincomegroup");
const importCastes = require("./base_tables/caste");
const importReligions = require("./base_tables/religion");
const importUniversities = require("./base_tables/university")

const importData = async () => {
  try {
    return Promise.resolve()
      .then(() => importCountries())
      .then(() => importStates())
      .then(() => importDistricts())
      .then(() => importStreams())
      .then(() => importCourses())
      .then(() => importFIG())
      .then(() => importCastes())
      .then(() => importReligions())
      .then(() => importUniversities())
      .then(() => {
        const regex = /[.]temp[.]json$/;
        fs.readdirSync(folder)
          .filter((f) => regex.test(f))
          .map((el) => fs.unlinkSync(folder + "/" + el));
        console.log("Data imported successfully");
      });
  } catch (error) {
    console.log(error);
  }
};

importData().then(() => {
  mongoose.connection.close();
  process.exit();
});
