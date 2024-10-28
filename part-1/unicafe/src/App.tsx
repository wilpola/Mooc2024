import { useEffect, useState } from "react";
import { Controls, Statistics } from "./components";

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
interface IStatistics {
  total: number;
  average: number;
  positive: number;
}

function App() {
  const [reviews, setReviews] = useState<IReviews>({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [statistics, setStatistics] = useState<IStatistics>({
    total: 0,
    average: 0,
    positive: 0,
  });

  useEffect(() => {
    let total = reviews.good + reviews.neutral + reviews.bad;

    // Calculate the percent positive
    let calculatedPositive = (reviews.good / total) * 100;

    // Calculate the average
    let calculatedAverage = (reviews.good * 1 + reviews.bad * -1) / total;

    setStatistics({
      ...statistics,
      positive: calculatedPositive,
      average: calculatedAverage,
      total: total
    });
  }, [reviews]);

  return (
    <div className="container mx-2">
      <h1 className="text-2xl mb-4 font-semibold">Give Feedback</h1>
      <Controls className={"mb-2"} setReviews={setReviews} reviews={reviews} />

      {/* Statistics */}
      <h2 className="text-xl font-semibold">Statistics</h2>
      {reviews.good > 0 || reviews.neutral > 0 || reviews.bad > 0 ? (
        <>
          <Statistics reviews={reviews} statistics={statistics} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
