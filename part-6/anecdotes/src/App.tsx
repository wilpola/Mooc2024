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
    <div className="w-[95%] max-w-screen-md mx-auto py-10 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-semibold">Anecdotes</h1>

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
                <div className="my-4 p-4 border rounded-md">
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
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

      {/* Add New Anecdote Form */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new</Button>
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
    </div>
  );
}

export default App;
