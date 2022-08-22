const stateModel = require("../../schema/base_tables/states");

const states = require("../data/states.json");

const fs = require("fs");
const path = require("path");

const importStates = async () => {
  try {
    const folder = path.join(__dirname, "..", "data");
    const countriesPath = `${folder}/country.temp.json`;
    const statesPath = `${folder}/state.temp.json`;
    const fileContent = fs.readFileSync(countriesPath, "utf8");
    const countries = JSON.parse(fileContent);
    await stateModel.deleteMany({});
    let statesData = [];
    for (let i = 0; i < states.length; i++) {
      let state = states[i];
      let c = Object.keys(state)[0];
      let id = countries.filter((el) => c === Object.keys(el)[0])[0];
      let data = state[c].map((el) => ({ country: id[c], ...el }));
      statesData.push(...data);
    }
    const result = await stateModel.insertMany(statesData);
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      fs.writeFileSync(statesPath, json, "utf-8", (err, data) => {
        if (err) console.log(err);
      });
      console.log("States imported successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = importStates;
