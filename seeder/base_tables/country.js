const countryModel = require("../../schema/base_tables/countries");

const countries = require("../data/countries.json");

const fs = require("fs");
const path = require("path");

const importCountries = async () => {
  try {
    await countryModel.deleteMany({});
    await countryModel.insertMany(countries);
    let result = await countryModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/country.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Countries imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importCountries;
