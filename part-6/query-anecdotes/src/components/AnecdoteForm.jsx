import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdote-reducers";
import axios from "axios";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long");
      return;
    } else {
      console.log("new anecdote", content);

      // Create new anecdote
      dispatch(createAnecdote({ content, votes: 0, id: crypto.randomUUID() }));
      event.target.anecdote.value = "";
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" placeholder="Enter anecdote here..." />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
