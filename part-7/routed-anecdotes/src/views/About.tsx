// About page

export default function About() {
  return (
    <div className="w-[95%] max-w-screen-md mx-auto pt-5 flex gap-2 flex-col">
      <h1 className="text-2xl font-semibold">About Anecdotes</h1>
      <p>According to Wikipedia:</p>

      <em className="p-3 bg-muted-foreground/10 border-l-4 border-l-muted-foreground rounded-md gap-2 ">
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>

      <p>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </p>
    </div>
  );
}
