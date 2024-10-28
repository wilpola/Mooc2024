/**
 * Controls component
 * @author wilpola
 */

export default function Controls(props: any) {
  return (
    <div className={`flex gap-x-2 ${props.className}`}>
      <button
        className="border rounded-md px-2 py-1 border-slate-400 text-sm hover:bg-slate-200"
        onClick={() =>
          props.setReviews({ ...props.reviews, good: props.reviews.good + 1 })
        }
      >
        good
      </button>
      <button
        className="border rounded-md px-2 py-1 border-slate-400 text-sm hover:bg-slate-200"
        onClick={() =>
          props.setReviews({
            ...props.reviews,
            neutral: props.reviews.neutral + 1,
          })
        }
      >
        neutral
      </button>
      <button
        className="border rounded-md px-2 py-1 border-slate-400 text-sm hover:bg-slate-200"
        onClick={() =>
          props.setReviews({ ...props.reviews, bad: props.reviews.bad + 1 })
        }
      >
        bad
      </button>
    </div>
  );
}
