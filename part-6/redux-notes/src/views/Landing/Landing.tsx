// Landing page component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon, Flag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "@/reducers/notesSlice";
import type { NotesState } from "@/reducers/notesSlice";

export default function Landing() {
  return (
    <div className="w-[95%] max-w-screen-md mx-auto py-10">
      <h1 className="text-2xl font-semibold">Redux notes</h1>
      <h4 className="text-muted-foreground font-medium pb-2">
        Note taking app utilizing Redux
      </h4>
      <div className="flex gap-4 items-center justify-between">
        <NoteInput />
        <NoteFilter />
      </div>
      <div className="pt-4">
        <NoteList />
      </div>
    </div>
  );
}

export function NoteFilter() {
  return (
    <>
      <Button size={"icon"} variant="outline">
        <FilterIcon />
      </Button>
    </>
  );
}

export function NoteInput() {
  const dispatch = useDispatch();
  return (
    <>
      <Input
        placeholder="Type your note here..."
        className="flex-1"
        id="note-input"
      />
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          const input = document.getElementById(
            "note-input"
          ) as HTMLInputElement;
          if (input && input.value.trim() !== "") {
            // Dispatch action to add note
            dispatch(
              addNote({
                id: crypto.randomUUID(),
                content: input.value,
                important: false,
              })
            );
            input.value = ""; // Clear input field after adding note
          }
        }}
      >
        Add Note
      </Button>
    </>
  );
}

export function NoteList() {
  const notes = useSelector((state: NotesState) => state.notes.notes);
  console.log(notes);
  return (
    <>
      <div>Note List</div>
      <ul>
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded-md my-2 grid grid-cols-[1fr_40px] gap-4">
            <div className="">
              <h4 className="font-semibold text-xs text-muted-foreground">
                {note.id}
              </h4>
              <p>{note.content}</p>
            </div>
            <div className="text-right">
              <Button size={"icon"} variant="outline" >
                {note.important ? <Flag className="text-red-500" /> : <Flag />}
              </Button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
