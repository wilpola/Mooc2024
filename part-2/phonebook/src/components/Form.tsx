/**
 * Input group to make the form quicker
 * @author wilpola
 */

import IPeople from "../App";

// import modules
import axios from "axios";

export const Form = ({
  newPerson,
  setNewPerson,
  people,
  setPeople,
  counter,
  setCounter,
}: any) => {
  const handleAddition = (e: any) => {
    e.preventDefault(); // Prevent refresh

    /**
     * Check for duplicates in the object array
     * @returns boolean true / false
     */
    // dont submit empty data
    if (newPerson.name !== "" && newPerson.name !== " ") {
      const duplicate = people.find(
        (person: typeof IPeople) =>
          person.name.toLowerCase() === newPerson.name.toLowerCase() // Check each with as a lowercase
      );
      if (duplicate) {
        alert(`Person "${newPerson}" is already in the database.`);
      } else {
        setPeople([
          ...people,
          { name: newPerson.name, phone: newPerson.phone, id: counter + 1 },
        ]);
        setNewPerson({ name: "", phone: "", id: counter });
        setCounter(counter + 1);
        axios
          .post("http://localhost:3001/persons", newPerson)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <form onSubmit={(e) => handleAddition(e)}>
      <div className="flex flex-col justify-start">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="px-2 py-1 border border-slate-400 rounded-md"
          placeholder="First last"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col justify-start">
        <label htmlFor="number">Phone</label>
        <input
          id="number"
          className="px-2 py-1 border border-slate-400 rounded-md"
          placeholder="Phone"
          value={newPerson.phone}
          onChange={(e) =>
            setNewPerson({ ...newPerson, phone: e.target.value })
          }
        />
      </div>
      <button
        className="text-white mt-2 py-2 px-4 bg-slate-700 hover:bg-slate-800"
        onClick={(e) => handleAddition(e)}
      >
        Add to Phonebook
      </button>
    </form>
  );
};
