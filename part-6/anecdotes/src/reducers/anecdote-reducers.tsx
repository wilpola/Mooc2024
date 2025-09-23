import {
  createSlice,
  type Dispatch,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

// Anecdote reducers file
export const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

export interface AnecdoteProps {
  content: string;
  id: string;
  votes: number;
}

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
    createAnecdote: (state, action) => {
      const content = action.payload;
      state.push(asObject(content));
    },
    resetInitialState: () => {
      return initialState;
    },
    initializeAnecdotes(state, action: PayloadAction<unknown[]>) {
      // This reducer is intentionally left blank as anecdotes are handled in a different slice
      state.push(...(action.payload as AnecdoteProps[]));
    },
  },
});

export const { vote, createAnecdote, resetInitialState } =
  anecdoteSlice.actions;

export function initializeAnecdotes() {
  return async (dispatch: Dispatch) => {
    try {
      const localResponse = await axios.get("http://localhost:3001/");
      dispatch({
        type: "anecdotes/initializeAnecdotes",
        payload: localResponse.data,
      });
    } catch (error) {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fullstack-hy2020/misc/refs/heads/master/anecdotes.json"
        );
        // console.log(response.data.anecdotes);
        dispatch({
          type: "anecdotes/initializeAnecdotes",
          payload: response.data.anecdotes,
        });
        return;
      } catch (error) {
        console.error("Failed to fetch anecdotes:", error);
      }
      console.error("Failed to fetch local anecdotes:", error);
    }
  };
}
export default anecdoteSlice.reducer;
