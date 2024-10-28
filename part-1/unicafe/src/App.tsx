import { useState } from "react";

/**
 * The Unicafe 1.6-1.14
 * @author wilpola
 */

// interface
interface IReviews {
  good: number;
  neutral: number;
  bad: number;
}

function App() {
  const [reviews, setReviews] = useState<IReviews>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return <div className="text-2xl bg-yellow-200">Reviews: {reviews.good}</div>;
}

export default App;
