// Notes Slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  content: string;
  important: boolean;
}

export interface NotesState {
  notes: Note[];
  filter: "ALL" | "IMPORTANT" | "NONIMPORTANT";
}

const initialState: NotesState = {
  notes: [
    {
      content: "reducer defines how redux store works",
      important: true,
      id: "1",
    },
    {
      content: "state of store can contain any data",
      important: false,
      id: "2",
    },
  ],
  filter: "ALL",
};

export const asObject = (note: Note) => {
    return {
        content: note.content,
        id: note.id,
        important: note.important,
    };
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      console.log(action.payload);
      const content = action.payload;
      state.notes.push(asObject(content));
      console.log(state.filter);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
  },
});

export const { addNote, removeNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
