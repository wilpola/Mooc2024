import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    good: 0,
    ok: 0,
    bad: 0,
  },
  reducers: {
    incrementGood: (state) => {
      state.good += 1;
    },
    incrementOk: (state) => {
      state.ok += 1;
    },
    incrementBad: (state) => {
      state.bad += 1;
    },
    reset: (state) => {
      state.good = 0;
      state.ok = 0;
      state.bad = 0;
    },
  },
});

export const { incrementGood, incrementOk, incrementBad, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
