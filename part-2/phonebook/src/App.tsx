import { useEffect, useState } from "react";
import { Form, PhoneBook } from "./components";

// import db
import axios from "axios";

// import backend code "services"
import peopleProvider from "./services/people";

export interface IPeople {
  id: number;
  name: string;
  phone?: string;
}

function App() {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [counter, setCounter] = useState<number>(4);
  const [newPerson, setNewPerson] = useState<IPeople>({
    name: "",
    phone: "",
    id: counter,
  });
  const [filtered, setFiltered] = useState<string>("");
  const [phonebook, setPhoneBook] = useState<any>(people);


  /**
   * Get data from the "server"
   * @returns updated state with people
   * @author wilpola
   */
  useEffect(() => {
    peopleProvider
      .getAll()
      .then((response) => setPeople(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto max-w-screen-md m-10 w-[95%]">
      <h1 className="text-2xl font-semibold">Phonebook</h1>
      <Form
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        people={people}
        setPeople={setPeople}
        counter={counter}
        setCounter={setCounter}
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
  );
}

export default App;
