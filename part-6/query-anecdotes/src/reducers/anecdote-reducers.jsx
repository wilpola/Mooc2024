// Reducer for anecdotes
import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
  },
});

export const { setAnecdotes, addAnecdote, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = (anecdotes) => {
  return (dispatch) => {
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return (dispatch) => {
    dispatch(addAnecdote(anecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return (dispatch) => {
    dispatch(updateAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
