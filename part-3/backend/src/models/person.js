const mongoose = require("mongoose");

// import dotenv config
require('dotenv').config();

mongoose.set("strictQuery", false);
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1);
}

const url = process.env.MONGO_URI;

console.log("Connecting to\n\n" + "\x1b[36m" + url + "\x1b[0m\n");
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const Person = new mongoose.Schema({
  name: String,
  number: String,
});

Person.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", Person, "person");
