require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

const Person = require("./models/person");

app.get("/", (req, res) => {
  const time = new Date("2022-03-25");
  res.send(time + "<br> Phone book has " + persons.length + " entries");
});


app.get("/api", (req, res) => {
  const time = new Date("2022-03-25");
  Person.find({}).then((persons) => {
    res.send(time + "<br> Phone book has " + persons.length + " entries");
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);

      
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => errorHandler(error, request, response, next));
});

app.post("/api/persons", (request, response) => {
  const data = request.body;

  const person = new Person({
    name: data.name,
    number: data.number,
  });

  person.save().then((result) => {
    console.log("person saved!");
    Person.find({}).then((persons) => {
      console.log(persons)
    });
    response.json(person);
  });
});

12
12
12
9
//todo: when data is empty error 
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => errorHandler(error, request, response, next))
  
});

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
