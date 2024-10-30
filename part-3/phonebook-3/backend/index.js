// Main backend file
const express = require("express");
const app = express();
const PORT = 8080;

// allow cors
const cors = require("cors");
app.use(cors());
app.use(express.json());

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

app.get("/api/persons", (req, res) => {
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

/**
 * Get single person
 *
 * @return Completes 3.3
 */
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebook.find((person) => person.id === id);
  res.status(200).json(person);
});

/**
 * Delete specific person
 *
 * @returns Completes 3.4
 */
app.delete("/api/delete/persons/:id", (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);

  res.status(204).end();
});

/**
 * Add people to the phonebook
 *
 * @return Completes 3.5 & 3.6
 * @Note This data only persists for as long as the server hasn't been restarted
 */
app.post("/api/create/person", (req, res) => {
  const { name, number } = req.body;
  // Create "random" id
  const id = Math.floor(Math.random() * 1000000);

  // Check for duplicates
  const nova = phonebook.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  if (nova) {
    console.log("nova: ", nova);
    return res
      .status(409)
      .json({ msg: "This person is already in the database" });
  }

  // If the number is missing
  if (!number) {
    return res.status(403).json({ msg: "Missing phone number" });
  }

  // Log what is being inputted
  console.log({ id: id, name: name, number: number });

  // Add the person to the phonebook
  phonebook = [...phonebook, { id: id, name: name, number: number }];
  // Send a message to the person that the new user has been added to the database
  return res.status(200).json({ msg: `${name} added to the phonebook` });
});

// Listen for traffic
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
