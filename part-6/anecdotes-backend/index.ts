// Main application file for simple anecdotes app
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

let anecdotes: any[] = [];
fetch(
  "https://raw.githubusercontent.com/fullstack-hy2020/misc/refs/heads/master/anecdotes.json"
)
  .then((res) => res.json())
  .then((data) => (
    anecdotes.push(...data.anecdotes),
    console.log("Anecdotes loaded:", data.anecdotes)
));

app.get("/", (req: Request, res: Response) => {
  res.send(anecdotes);
});

app.post("/", (req: Request, res: Response) => {
  const newAnecdote = req.body;
  anecdotes.push(newAnecdote);
  console.log("New anecdote added:", newAnecdote);
  res.status(201).json(newAnecdote);
});

app.post("/vote/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const anecdote = anecdotes.find((a) => a.id === id);
  if (anecdote) {
    anecdote.votes++;
    console.log(`Anecdote with id ${id} voted. Total votes: ${anecdote.votes}`);
    res.status(200).json(anecdote);
  } else {
    res.status(404).json({ error: "Anecdote not found" });
  }
});

// Remove anecdotes older than 15 minutes
setInterval(() => {
  const now = new Date();
  anecdotes = anecdotes.filter((anecdote) => {
    const createdAt = new Date(anecdote.timeStamp);
    const diff = (now.getTime() - createdAt.getTime()) / 1000 / 60; // difference in minutes
    if (diff > 15) {
      console.log(`Anecdote with id ${anecdote.id} removed after 15 minute.`);
      return false;
    }
    return true;
  });
}, 60000); 

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
