const express = require("express");
const app = express();

app.use(express.json())


let persons = [
  { id: 0, name: "maher", number: "123" },
  { id: 1, name: "maher", number: "123" },
  { id: 2, name: "maher", number: "123" },
];

app.get("/", (req, res) => {
  const time = new Date("2022-03-25");
  res.send(time + "<br> Phone book has " + persons.length + " entries");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => Number(person.id) === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => Number(person.id) === id);

  if (person) {
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
