import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./reducers/anecdote-reducers";
import filterReducer from "./reducers/filter-reducer";

export const store = configureStore({
    // All reducers 
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterReducer,
    },
});

