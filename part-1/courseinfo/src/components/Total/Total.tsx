/**
 * Return the total number of exercises
 * @author wilpola
 */

// Import Hooks
import { useEffect, useState } from "react";

// Import exercises
import exercises from "../../assets/exercises.json";

export default function Total() {
  // State
  const [total, setTotal] = useState<number>(0);
  // run on mount
  useEffect(() => {
    setTotal(exercises.length);
  }, [total]);
  return <p>Number of exercises {total}</p>;
}
