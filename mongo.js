const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://maher:${password}@phonebook.ilvhg3u.mongodb.net/?retryWrites=true&w=majority&appName=phoneBook`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personsSchema = new mongoose.Schema({
  id: Int32,
  name: String,
  number: String
});

const Person = mongoose.model("Person", personsSchema);

const person = new Person({
  id: 0,
  name: "maher",
  number: "0345"
  
});

person.save().then((result) => {
  console.log("Perons saved!");
  mongoose.connection.close();
});
