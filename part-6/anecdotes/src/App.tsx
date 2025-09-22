// Main application logic
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CirclePlus, GitCompareArrows } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./components/ui/textarea";
import { motion, Reorder } from "motion/react";

function App() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(
    (state: { anecdotes: { content: string; id: string; votes: number }[] }) =>
      state.anecdotes
  );

  return (
    <div className="w-[95%] h-screen max-w-screen-md mx-auto py-10 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Anecdotes</h1>

        {/* Add New Anecdote Form */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => dispatch({ type: "anecdotes/resetInitialState" })}
            variant="outline"
            className="text-sm hover:cursor-pointer"
          >
            <GitCompareArrows className="mr-2" />
            Reset
          </Button>
          <AnecdoteForm variant="default" />
        </div>
      </div>
      <div className="text-muted-foreground">
        <p className="text-muted-foreground">
          /ˈanɪkdəʊt/ - <span className="font-semibold">noun</span>
        </p>
        <p className="text-slate-400 font-medium">
          a short amusing or interesting story about a real incident or person.
        </p>
      </div>

      {/* Map Anecdotes */}
      <AnecdoteList />

      <AnecdoteForm variant="outline" />
    </div>
  );
}

interface AnecdoteFormProps {
  variant?: "outline" | "default";
}

export function AnecdoteForm({ variant }: AnecdoteFormProps) {
  const dispatch = useDispatch();
  return (
    // {/* Add New Anecdote Form */}
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" variant={variant}>
          <CirclePlus className="mr-2" />
          Add new
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add new anecdote</DialogTitle>
        <DialogDescription>
          Create a new anecdote to share with others.
        </DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = (e.target as HTMLFormElement).anecdote.value;
            dispatch({ type: "anecdotes/createAnecdote", payload: content });
            (e.target as HTMLFormElement).anecdote.value = "";
          }}
        >
          <div className="grid gap-4 pb-2">
            <div className="grid gap-2">
              <Textarea
                name="anecdote"
                id="anecdote"
                placeholder="Write your anecdote here..."
                autoFocus
                className="w-full px-3 py-0 border rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Add</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(
    (state: { anecdotes: { content: string; id: string; votes: number }[] }) =>
      state.anecdotes
  );

  return (
    <>
      {/* Map Anecdotes */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
        className="mt-6"
      >
        <Reorder.Group axis="y" values={anecdotes} onReorder={() => {}}>
          {[...anecdotes]
            .sort((a, b) => b.votes - a.votes)
            .map((anecdote) => (
              <Reorder.Item key={anecdote.id} value={anecdote}>
                <div className="my-4 p-4 border rounded-md grid grid-cols-[1fr_80px] gap-4">
                  <div>{anecdote.content}</div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{anecdote.votes}</span>{" "}
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="hover:cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "anecdotes/vote",
                          payload: anecdote.id,
                        })
                      }
                    >
                      vote
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      </motion.div>
    </>
  );
}

export default App;
