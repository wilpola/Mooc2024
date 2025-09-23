import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./styles.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [anecdotes, setAnecdotes] = useState([]);

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const a = useQuery({
    queryKey: ["anecdotes"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/anecdotes");
      setAnecdotes(response.data);
      return response.data;
    },
    retry: 1,
  });

  return (
    <div id="container">
      <h3 className="">Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <div className="wrapper">
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id} className="anecdote-item">
            <div>{anecdote.content}</div>
            <div className="anecdote-votes">
              <p>{anecdote.votes}</p>
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
