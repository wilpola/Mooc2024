// Main backend file
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3001;

const routePrefix = process.env.NODE_ENV === "production" ? "/api/v1" : "/api";

// 3.13
// Import mongo model
const Person = require("./models/person");

// allow cors
const cors = require("cors");
app.use(cors());
app.use(express.json());

/**
 * Add morgan
 * @returns completes 3.7
 */
var morgan = require("morgan");
const person = require("./models/person");
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

app.get(`${routePrefix}/api/hello`, (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get(`${routePrefix}/persons`, (req, res) => {
  // res.json(phonebook);

  // Use the mongo model to find all persons
  Person.find({})
    .then((persons) => {
      // Convert the persons to a JSON object
      res.json(persons.map((person) => person.toJSON()));
    })
    .catch((error) => {
      console.error("Error fetching persons:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get(`${routePrefix}/info`, (req, res) => {
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
app.get(`${routePrefix}/persons/:id`, (req, res) => {
  const id = req.params.id;
  // const person = phonebook.find((person) => person.id === id);
  // if (!person) {
  //   return res.status(404).send("Person not found");
  // } else {
  //   res.status(200).json(person);
  // }

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(200).json(person.toJSON());
    })
    .catch((error) => {
      console.error("Error fetching person:", error);
      res.status(500).send("Internal Server Error");
    });
});

/**
 * Delete specific person
 *
 * @returns Completes 3.4
 */
app.delete(`${routePrefix}/persons/:id`, (req, res) => {
  // Get the id from the params
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send("Person not found");
      }
      console.log(`Deleted person with id: ${id}`);
      return res.status(204).end();
    })
    .catch((error) => {
      console.error("Error deleting person:", error);
      return res.status(500).send("Internal Server Error");
    });

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
app.post(`${routePrefix}/persons`, (req, res) => {
  const { name, number } = req.body;

  // If the number is missing
  if (!number) {
    // send status 403 forbidden
    return res.status(403).json({ msg: "Number is missing" });
  }

  // If the name is missing
  if (!name) {
    // send status 403 forbidden
    return res.status(403).json({ msg: "Name is missing" });
  }

  // Create a new document
  const newPerson = new Person({
    name: name,
    number: number,
  });
  // Save the new person to the database
  Person
    .exists({ name: name })
    .then((exists) => {
      if (exists) {
        return res.status(409).json({ msg: "Name must be unique" });
      }
      return newPerson.save();
    })
    .then(() => {
      console.log(`Added ${name} number ${number} to phonebook`);
    })
    .catch((error) => {
      console.error("Error saving person:", error);
      return res.status(500).send("Something went wrong while saving the person");
    });
});

// Listen for traffic
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
