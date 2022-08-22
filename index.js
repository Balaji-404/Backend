const express = require("express");

if (process.env.NODE_ENV === "development") require("dotenv").config();

const dbConnection = require("./utils/DBconnection");

const app = express();
const cors = require("cors");

const authRoute = require("./routes/auth");

const countryRoute = require("./routes/base_tables/country");
const stateRoute = require("./routes/base_tables/state");
const districtRoute = require("./routes/base_tables/district");
const casteRoute = require("./routes/base_tables/caste");
const courseRoute = require("./routes/base_tables/course");
const figRoute = require("./routes/base_tables/familyincomegroup");
const religionRoute = require("./routes/base_tables/religion");
const skillRoute = require("./routes/base_tables/skillcategory");
const smlRoute = require("./routes/base_tables/socialmedialink");
const streamRoute = require("./routes/base_tables/stream");
const universityRoute = require("./routes/base_tables/university");
const roleRoute = require("./routes/roles");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

const routePrefix = "api";

//base_tables route
app.use(`/${routePrefix}/auth`, authRoute);
app.use(`/${routePrefix}/country`, countryRoute);
app.use(`/${routePrefix}/course`, courseRoute);
app.use(`/${routePrefix}/caste`, casteRoute);
app.use(`/${routePrefix}/district`, districtRoute);
app.use(`/${routePrefix}/university`, universityRoute);
app.use(`/${routePrefix}/familyincomegroup`, figRoute);
app.use(`/${routePrefix}/religion`, religionRoute);
app.use(`/${routePrefix}/skillcategory`, skillRoute);
app.use(`/${routePrefix}/socialmedialink`, smlRoute);
app.use(`/${routePrefix}/state`, stateRoute);
app.use(`/${routePrefix}/stream`, streamRoute);
app.use(`/${routePrefix}/role`, roleRoute);

//details route

app.listen(process.env.PORT, () => {
  try {
    dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db not connected");
  }
});
