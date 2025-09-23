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
  .then((data) => anecdotes.push(...data.anecdotes));

app.get("/", (req: Request, res: Response) => {
  res.send(anecdotes);
});

app.post("/", (req: Request, res: Response) => {
  const newAnecdote = req.body;
  anecdotes.push(newAnecdote);
  res.status(201).json(newAnecdote);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
