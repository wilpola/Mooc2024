// Filter component
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/reducers/filter-reducer";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function Filter() {
  const dispatch = useDispatch();

  return (
    <div className="pt-4">
      <Label htmlFor="filter" className="mb-2 font-medium">
        Filter Anecdotes
      </Label>
      <div className="flex items-center gap-2">
        <Input
          className="px-3 py-2 border rounded-md w-full"
          placeholder="Filter anecdotes..."
          value={useSelector((state: { filter: string }) => state.filter)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            dispatch({ type: "SET_FILTER", payload: e.target.value });
            dispatch(setFilter(e.target.value));
          }}
        />
        <Button onClick={() => dispatch(setFilter(""))}>Clear</Button>
      </div>
    </div>
  );
}
