const familyincomegroupModel = require("../../schema/base_tables/familyincomegroups");

const familyincomegroups = require("../data/familyincomegroups.json");

const fs = require("fs");
const path = require("path");

const importFamilyIncomeGroups = async () => {
  try {
    await familyincomegroupModel.deleteMany({});
    await familyincomegroupModel.insertMany(familyincomegroups);
    let result = await familyincomegroupModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/familyincomegroup.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Familyincomegroups imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importFamilyIncomeGroups;
