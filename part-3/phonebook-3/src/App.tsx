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
  const [phonebook, setPhoneBook] = useState<IPeople[]>(people);

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
        <h1 className="text-2xl font-semibold mb-5">FullStack Phonebook</h1>

        <Form
          people={people}
          newPerson={newPerson}
          setPeople={setPeople}
          setNewPerson={setNewPerson}
        />
        {people.length > 0 && (
          <PhoneBook
            people={people}
            filtered={filtered}
            phonebook={phonebook}
            setPeople={setPeople}
            setFiltered={setFiltered}
            setPhoneBook={setPhoneBook}
          />
        )}
      </div>
    </>
  );
}

export default App;
