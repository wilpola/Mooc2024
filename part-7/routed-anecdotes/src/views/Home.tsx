// Home page component
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Anecdote {
  content: string;
  author: string;
  info: string;
  votes: number | 0;
  id: number;
}

export default function Home() {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState<string>("");

  const addNew = (anecdote: Anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id);

  const vote = (id: number) => {
    const anecdote = anecdoteById(id);

    if (!anecdote) return;

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1 || 0,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="w-[95%] max-w-screen-md mx-auto">
      <h1 className="pb-2 text-xl font-semibold">Software anecdotes</h1>
      <div className="flex flex-col gap-2">
        {anecdotes.map((anecdote: Anecdote, index: number) => {
          return (
            <div
              className="p-4 border-neutral-500/50 border-1 rounded-md grid grid-cols-[1fr_60px] align-middle"
              key={index}
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
