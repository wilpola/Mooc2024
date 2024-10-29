import { useState } from "react";

interface IPeople {
  name: string;
}

function App() {
  const [people, setPeople] = useState<IPeople[]>([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState<string>("");

  const handleAddition = (e: any) => {
    e.preventDefault(); // Prevent refresh

    /**
     * Check for duplicates in the object array
     * @returns boolean true / false
     */

    const duplicate = people.find(
      (person) => person.name.toLowerCase() === newPerson.toLowerCase() // Check each with as a lowercase
    );
    if (duplicate) {
      alert(`Person "${newPerson}" is already in the database.`);
    } else {
      setPeople([...people, { name: newPerson }]);
      setNewPerson("");
    }
  };

  return (
    <div className="mx-auto max-w-screen-md m-10">
      <h1 className="text-2xl font-semibold">Phonebook</h1>
      <form onSubmit={(e) => handleAddition(e)}>
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
        <button
          className="text-white mt-2 py-2 px-4 bg-slate-700 hover:bg-slate-800"
          onClick={(e) => handleAddition(e)}
        >
          Add to Phonebook
        </button>
      </form>
      <div className="flex flex-col mt-6">
        <h2 className="text-xl font-semibold">People</h2>
        {people
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((i: any, k: number) => {
            return (
              <p key={k} className="capitalize">
                {i.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default App;
