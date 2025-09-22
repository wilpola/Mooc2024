import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./reducers/anecdote-reducers";

export const store = configureStore({
    // All reducers 
    reducer: {
        anecdotes: anecdotesReducer,
    },
});

