const mongoose = require("mongoose");

const connect = (password) => {
  const url = `mongodb+srv://fullstack:${password}@cluster0.w0uapi8.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
  mongoose.connect(url);
};

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const [password, name, number] = process.argv.slice(2);
  connect(password);

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  const password = process.argv[2];
  connect(password);

  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  console.log("node mongo.js <your password> <person name> <number>");
  process.exit();
}
