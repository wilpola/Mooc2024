import { useState } from "react";
import { Form, PhoneBook } from "./components";

export interface IPeople {
  id: number;
  name: string;
  phone?: string;
}

function App() {
  const [people, setPeople] = useState<IPeople[]>([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [counter, setCounter] = useState<number>(4);
  const [newPerson, setNewPerson] = useState<IPeople>({
    name: "",
    phone: "",
    id: counter,
  });
  const [filtered, setFiltered] = useState<string>("");
  const [phonebook, setPhoneBook] = useState<any>(people);

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
      <PhoneBook
        filtered={filtered}
        setFiltered={setFiltered}
        phonebook={phonebook}
        people={people}
        setPhoneBook={setPhoneBook}
      />
    </div>
  );
}

export default App;
