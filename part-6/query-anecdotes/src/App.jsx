import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { setAnecdotes } from "./reducers/anecdote-reducers";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const a = useQuery({
    queryKey: ["anecdotes"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/anecdotes");
      dispatch(setAnecdotes(response.data));
      console.log("response", response.status);
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setLoading(false);
    },
    onError: (error) => {
      setStatus(error.message);
      setLoading(false);
    },
  });

  if (a.isLoading) {
    return (
      <div className="loading">
        <p>loading data...</p>
      </div>
    );
  }

  // Show error if server refuses connection
  if (a.isError) {
    return <ServerConnectionError />;
  }

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

const ServerConnectionError = () => {
  return (
    <div className="">Anecdote service not available due to a server error</div>
  );
};

export default App;
