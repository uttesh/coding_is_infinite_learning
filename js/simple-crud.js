const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dburl = "mongodb://localhost:27017/simple-crud";
mongoose.Promise = global.Promise;

// DB related
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

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 75,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
// Routes

app.get("/", (req, res) => {
  console.log("Welcome to the simple crud application.......");
});

app.post("/users", create);

// Retrieve all Notes
app.get("/users", findAll);

// Retrieve user by email
app.get("/users/:email", findOne);

// // Update user by email
// app.put("/users/:email", update);

// // Delete user by email
// app.delete("/users/:email", deleteUser);

// CRUD functions

/**
 * Create user
 * @param {*} req
 * @param {*} res
 */
function create(req, res) {
  // Validate request
  console.log("req.body: ", req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  // save
  user
    .save()
    .then((data) => {
      console.log("Data saved successfully...: ", data);
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Note.",
      });
    });
}

// Find All
/**
 * GEt all the users
 * @param {*} req
 * @param {*} res
 */
function findAll(req, res) {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving the users",
      });
    });
}

// Find user
/**
 *
 * @param {*} req
 * @param {*} res
 */
function findOne(req, res) {
  console.log("req.params:: ", req.params);
  User.findOne({ email: req.params.email })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found " + req.params.email,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving the user",
      });
    });
}

// update user record

function update(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.content, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found" + req.params.id,
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Error while updaing the user:" + req.params.id,
      });
    });
}

app.listen(3000, () => {
  console.log("Simple CRUD server listening at port 3000");
});
