/**
 * Main application file
 * @author wilpola
 */

// import modules
import { useState, useEffect } from "react";

// import service hooks
import phonebookProvider from "./services/people";
import { Form, PhoneBook } from "./components";

// Types
export interface IPeople {
  name: string;
  id: string;
  number: string;
}

function App() {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [newPerson, setNewPerson] = useState<IPeople>({
    name: "",
    number: "",
    id: "",
  });
  const [filtered, setFiltered] = useState<string>("");
  const [phonebook, setPhoneBook] = useState<any>(people);

  /**
   * Get data from the "server"
   * @returns updated state with people
   * @author wilpola
   */
  useEffect(() => {
    phonebookProvider
      .getAll()
      .then((response) => setPeople(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="m-10 max-w-screen-md mx-auto"></div>

      <div className="mx-auto max-w-screen-md m-10 w-[95%]">
        <h1 className="text-2xl font-semibold">FullStack Phonebook</h1>
        <div className="rounded-md py-4 px-4 bg-neutral-200 shadow-md shadow-neutral-200 my-3">
          <p className="text-base font-normal">
            {" "}
            This is my implementation for the full stack phonebook assignment as
            part of the fullstack open course. This completes the 3rd part of
            the course.
            <br />
            <span className="text-indigo-700">
              @author:{" "}
              <a href="https://github.com/wilpola" target="_blank">
                wilpola
              </a>
            </span>
          </p>
        </div>
        <Form
          newPerson={newPerson}
          setNewPerson={setNewPerson}
          people={people}
          setPeople={setPeople}
        />
        {people.length > 0 && (
          <PhoneBook
            filtered={filtered}
            setFiltered={setFiltered}
            phonebook={phonebook}
            people={people}
            setPhoneBook={setPhoneBook}
          />
        )}
      </div>
    </>
  );
}

export default App;
