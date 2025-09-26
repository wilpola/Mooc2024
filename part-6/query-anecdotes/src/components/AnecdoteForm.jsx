const AnecdoteForm = () => {
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long");
      return;
    } else {
      console.log("new anecdote", content);
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
