// Home page component
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Anecdote } from "../types";

const initialAnecdotes: Anecdote[] = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: crypto.randomUUID(),
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: crypto.randomUUID(),
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([...initialAnecdotes]);

  useEffect(() => {
    const x = window.localStorage.getItem("anecdotes");
    if (x) {
      setAnecdotes(JSON.parse(x));
    } else {
      window.localStorage.setItem("anecdotes", JSON.stringify(anecdotes));
    }
  }, []);

  const resetApplication = () => {
    window.localStorage.removeItem("anecdotes");
    setAnecdotes(initialAnecdotes);
    window.localStorage.setItem("anecdotes", JSON.stringify(initialAnecdotes));
  };

  //   const [notification, setNotification] = useState<string>("");

  return (
    <div className="w-[95%] max-w-screen-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Software anecdotes</h1>
        <Button variant={"outline"} onClick={() => resetApplication()}>
          Reset Application state
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {anecdotes.map((anecdote: Anecdote, index: number) => {
          return (
            <div
              className="p-4 border-neutral-500/50 border-1 rounded-md grid grid-cols-[1fr_60px] align-middle"
              key={index}
              onClick={() => navigate(`/anecdotes/${anecdote.id}`)}
            >
              <div className="h-full flex items-center justify-start">
                <p>{anecdote.content}</p>
              </div>
              <Button variant={"outline"}>vote</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
