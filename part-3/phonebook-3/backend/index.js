// Main backend file
const express = require("express");
const app = express();
const PORT = 3001;

// allow cors
const cors = require("cors");
app.use(cors());
app.use(express.json());

/**
 * Add morgan
 * @returns completes 3.7
 */
var morgan = require("morgan");
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :body - :response-time ms"));

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
  if (!person) {
    return res.status(404).send("Person not found");
  } else {
    res.status(200).json(person);
  }
});

/**
 * Delete specific person
 *
 * @returns Completes 3.4
 */
app.delete("/api/persons/:id", (req, res) => {
  // Get the id from the params
  const id = req.params.id;

  // Remove the item from the "database"
  phonebook = phonebook.filter((person) => person.id !== id);

  // Send status, and end connection
  res.status(204).end();
});

/**
 * A function to generate a random id
 * @returns {string} A random id
 */
const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

/**
 * Add people to the phonebook
 *
 * @return Completes 3.5 & 3.6
 * @Note This data only persists for as long as the server hasn't been restarted
 */
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // If the number is missing
  if (!number) {
    return res.status(403).json({ msg: "Number is missing" });
  }

  // Check for duplicates
  const nova = phonebook.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  console.log("nova: ", nova);
  if (nova) {
    // console.log("nova: ", nova);
    return res.status(409).json({ msg: "Name must be unique" });
  }

  // Create "random" id
  const id = generateId();

  // Log what is being inputted
  console.log({ id: id.toString(), name: name, number: number });

  // Add the person to the phonebook
  phonebook = [...phonebook, { id: id, name: name, number: number }];

  // Send a message to the person that the new user has been added to the database
  return res
    .status(200)
    .json({ person: { id: id.toString(), name: name, number: number } });
});

// Listen for traffic
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
