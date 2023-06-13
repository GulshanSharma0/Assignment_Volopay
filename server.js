require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const apiRoutes = require("./routes");

db();

app.use("/api", apiRoutes);

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
