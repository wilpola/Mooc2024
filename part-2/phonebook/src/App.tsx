import { useState } from "react";

interface IPeople {
  name: string;
}

function App() {
  const [people, setPeople] = useState<IPeople>({ name: "Arto Hellas" });
  const [newPerson, setNewPerson] = useState<string>("");

  return (
    <div className="mx-auto max-w-screen-md m-10">
      <h1 className="text-2xl font-semibold">Phonebook</h1>
      <form>
        <div className="flex flex-col justify-start">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="px-2 py-1 border border-slate-400 rounded-md"
            placeholder="First last"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
          />
        </div>
        <button className="text-white mt-2 py-2 px-4 bg-slate-700 hover:bg-slate-800">Add to Phonebook</button>
      </form>
    </div>
  );
}

export default App;
