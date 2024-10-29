/**
 * Course info pt.2 code
 * @author wilpola
 */

// import components
import { Course } from "./components";

// import course date
import data from './courses.json';

function App() {
  const course = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
      ],
    },
  ];

  return (
    <div className="m-10">
    <h1 className="mb-3 text-3xl font-semibold">Web Development Curriculum</h1>
    {data.map((i: any, k: any) => {
      return(
        <Course course={i} key={k} />
      )
    })}
    </div>
  );
}

export default App;
