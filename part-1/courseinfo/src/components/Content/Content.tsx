/**
 * The content components
 * @author wilpola
 */

// Imports
import content from "../../assets/exercises.json";

interface IContent {
  part: string;
  exercise: string;
}

export default function Content() {
  return (
    <div>
      {content.map((i, k) => {
        return <ContentRenderer key={k} part={i.part} exercise={i.excercise} />;
      })}
    </div>
  );
}

const ContentRenderer = ({ part, exercise }: IContent) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};
