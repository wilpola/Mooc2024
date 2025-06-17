import { SetStateAction, useEffect, useState } from "react";
import { Form, PhoneBook } from "./components";

// import backend code "services"
import peopleProvider from "./services/people";

export interface IPeople {
  id: number;
  name: string;
  phone?: string;
}

function App() {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const [newPerson, setNewPerson] = useState<IPeople>({
    name: "",
    phone: "",
    id: nextId,
  });
  const [filtered, setFiltered] = useState<string>("");
  const [phonebook, setPhoneBook] = useState<IPeople[]>(people);

  /**
   * Get data from the "server"
   * @returns updated state with people
   * @author wilpola
   */
  useEffect(() => {
    peopleProvider
      .getAll()
      .then((response: { data: SetStateAction<IPeople[]>; }) => setPeople(response.data))
      .catch((err: unknown) => console.log(err));
  }, []);

  useEffect(() => {
    peopleProvider
      .getId()
      .then((res: { data: { id: number; }; }) => {
        setNewPerson({ ...newPerson, id: `${res.data.id}` });
        setNextId(res.data.id);
      })
      .catch((err: unknown) => console.log(err));
  }, []);

  return (
    <div className="mx-auto max-w-screen-md m-10 w-[95%]">
      <h1 className="text-2xl font-semibold">Phonebook</h1>
      <Form
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        people={people}
        setPeople={setPeople}
        nextId={nextId}
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
      <button onClick={() => console.log(nextId)}>Debug</button>
    </div>
  );
}

export default App;
