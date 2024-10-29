import { useEffect, useState } from "react";

function App() {
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const array = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState<number[]>(array);
  const [ indexOfTopVote, setIndexOfTopVote ] = useState<number>(0);

  const handleNext = () => {
    if (selected < anecdotes.length - 1) {
      setSelected(selected + 1);
    } else {
      setSelected(0);
    }
  };

  const handleVote = () => {
    // setVotes(
    //   votes.map((vote) => {
    //     console.log(vote);
    //     return vote;
    //   })
    // );
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  useEffect(() => {
    setIndexOfTopVote(votes.indexOf(Math.max(...votes)))
  }, [votes]);

  return (
    <>
      <TopVoted votes={votes[indexOfTopVote]}>{anecdotes[indexOfTopVote]}</TopVoted>
      <div className="grid w-screen h-screen justify-center place-content-center">
        <div className="flex w-full max-w-[420px] min-w-[100%]">
          <div className="grid w-[420px]">
            {/* Header */}
            <div className="flex justify-between">
              <p className="text-lg font-semibold">id: {selected}</p>
              <Badge
                val={
                  votes[selected] ? votes[selected] + " votes" : 0 + " votes"
                }
              ></Badge>
            </div>

            {/* Anecdote */}
            <p className="w-full">{anecdotes[selected]}</p>

            {/* Controls */}
            <div className="flex gap-x-3">
              <button className="text-white mt-1" onClick={() => handleVote()}>
                Vote
              </button>
              <button className="text-white mt-1" onClick={() => handleNext()}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const Badge = ({ val, className }: any) => {
  return (
    <span className={`bg-slate-200 rounded-md px-2 space-y-1.5 ${className}`}>
      {val}
    </span>
  );
};

const TopVoted = ({ children, votes }: any) => {
  return (
    <div className="rounded-md p-4 bg-blue-200 fixed top-[30px] left-1/2 -translate-x-1/2 min-h-[50px] w-[95%] max-w-screen-md">
      <div className="flex justify-between columns-2">
        <h2 className="text-lg font-semibold">{"Top Voted"}</h2>
        <Badge className="text-right flex-none" val={votes + " votes"}></Badge>
      </div>
      <p className="col-span-full">{children}</p>
    </div>
  );
};
