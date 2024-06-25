const express = require("express");
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

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



app.post('/api/persons', (request, response) => {
  const data = request.body
  const person ={
    id: data.id,
    name: data.name,
    number: data.number
  }
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => Number(person.id) === id);
  console.log("Deletion insataitaon")
  if (person) {
    persons = persons.filter((person) => Number(person.id) !== id);
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
