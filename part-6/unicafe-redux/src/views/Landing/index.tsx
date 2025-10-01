// Landing page
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { incrementBad, incrementGood, incrementOk, reset } from "@/reducers/counter";

export default function Landing() {
  const dispatch = useDispatch();
  const { good, ok, bad } = useSelector(
    (state: { counter: { good: number; ok: number; bad: number } }) =>
      state.counter
  );

  return (
    <div className="w-[95%] max-w-screen-md mx-auto pt-10">
      <h1 className="text-2xl font-semibold">Redux</h1>

      <div className="py-4 flex gap-2">
        <Button
          variant={"outline"}
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(incrementGood());
          }}
        >
          Good
        </Button>
        <Button
          variant={"outline"}
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(incrementOk());
          }}
        >
          Ok
        </Button>
        <Button
          variant={"outline"}
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(incrementBad());
          }}
        >
          Bad
        </Button>
        <Button
          variant={"default"}
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(reset());
          }}
        >
          Reset
        </Button>
      </div>

      {/* Show state */}
      <div className="p-4 border rounded-md">
        <code>good: {good}</code> <br />
        <code>ok: {ok}</code> <br />
        <code>bad: {bad}</code>
      </div>
    </div>
  );
}
