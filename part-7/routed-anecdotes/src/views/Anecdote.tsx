import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useParams } from "react-router-dom";
import type { Anecdote } from "../types";

export default function Anecdote() {
  const [anecdote, setAnecdote] = useState<Anecdote | null>(null);
  const [voted, setVoted] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const x = window.localStorage.getItem("anecdotes");
    if (x) {
      const a = JSON.parse(x);
      console.log(a);
      const as = a.find((a: any) => a.id === id);
      setAnecdote(as);
    }
  }, []);

  const voteAnecdote = () => {
    setVoted(true);

    if (voted) {
      setVoted(false);
      const x = window.localStorage.getItem("anecdotes");
      if (x) {
        const a = JSON.parse(x);
        const as = a.find((a: any) => a.id === id);
        if (as) {
          as.votes = as.votes ? as.votes - 1 : 0;
          const newAnecdotes = a.map((an: any) =>
            an.id === as.id ? { ...an, votes: as.votes } : an
          );
          window.localStorage.setItem(
            "anecdotes",
            JSON.stringify(newAnecdotes)
          );
          setAnecdote(as);
        }
      }
    }

    if (!voted) {
      const x = window.localStorage.getItem("anecdotes");
      if (x) {
        const a = JSON.parse(x);
        const as = a.find((a: any) => a.id === id?.toString());
        if (as) {
          as.votes = as.votes ? as.votes + 1 : 1;
          const newAnecdotes = a.map((an: any) =>
            an.id === as.id ? { ...an, votes: as.votes } : an
          );
          window.localStorage.setItem(
            "anecdotes",
            JSON.stringify(newAnecdotes)
          );
          setAnecdote(as);
        }
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto w-[95%] h-full flex flex-col justify-center items-center gap-4">
      <p className="text-lg">
        {anecdote?.content}{" "}
        <span className="font-semibold">
          {" "}
          by {anecdote?.author || "Unknown"}
        </span>
      </p>
      <div className="py-2">
        <Button variant="outline" onClick={voteAnecdote}>
          <Heart className={`mr-1 h-4 w-4 ${voted ? "text-red-500" : ""}`} />
          {anecdote?.votes || 0} votes
        </Button>
      </div>
    </div>
  );
}
