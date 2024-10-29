/**
 * Course component
 * @author wilpola
 */

const Course = ({ course }: any) => {
  const NumOfExcercises = course.parts.reduce((a: any, { exercises }: any) => {
    return (a += exercises);
  }, 0);
  return (
    <>
      <div className="grid grid-cols-1 my-3 bg-gray-300 rounded-md p-6 shadow-md drop-shadow-sm shadow-gray-200">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{course.name}</h2>
          <span className="text-sm bg-gray-200 px-3 m-0 py-1 rounded-md border border-gray-300">
            {"#" + course.id}
          </span>
        </div>
        <div className="">
          {course.parts.map((i: any, k: number) => {
            return (
              <div className="" key={k}>
                {i.name} {i.exercises}
              </div>
            );
          })}
          <h3 className="font-medium">Total of {NumOfExcercises} exercises</h3>
        </div>
      </div>
    </>
  );
};

export default Course;
