const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dburl = "mongodb://localhost:27017/simple-crud";
mongoose.Promise = global.Promise;

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to DB.....");
  })
  .catch((error) => {
    console.error("Error while connecting to DB: ", error);
    process.exit();
  });

app.get("/", (req, res) => {
  console.log("Welcome to the simple crud application.......");
});

app.listen(3000, () => {
  console.log("Simple CRUD server listening at port 3000");
});
