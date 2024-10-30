// Main backend file
const express = require("express");
const app = express();
const PORT = 8080;

// allow cors
const cors = require("cors");
app.use(cors());

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/hello", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/get/phonebook", (req, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {

    let date = new Date();
  res.send(
    `<div> 
        <p>Phonebook has info for ${phonebook.length} people</p> 
        <p>${date}</p>
    </div>`
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
