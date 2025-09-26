// Application store file
import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from "./reducers/anecdote-reducers";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  },
});

export default store;
