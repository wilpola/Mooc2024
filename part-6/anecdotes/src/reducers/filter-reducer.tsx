//create slice
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (_state, action) => {
      return action.payload;
    },
    resetFilter: () => {
      return "";
    },
  },
});

// Export actions
export const { setFilter, resetFilter } = filterSlice.actions;

// Export reducer
export default filterSlice.reducer;
