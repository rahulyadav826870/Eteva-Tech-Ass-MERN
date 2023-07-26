const express = require("express");
const cors = require("cors");
const { connected } = require("./utils/db");
const { companyRouter } = require("./routes/companyRoute.route");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  try {
    res.send("This is home Page");
  } catch (error) {}
});

app.use("/company", companyRouter);

app.listen(process.env.port, async () => {
  try {
    await connected;
    console.log("Connected to Mongoose");
    console.log(`Server is Running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
