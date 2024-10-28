/**
 * The header component
 * @author wilpola
 */

interface IHeader {
    course: string;
}

export default function Header({course}: IHeader) {
  return <h1>{course}</h1>;
}
