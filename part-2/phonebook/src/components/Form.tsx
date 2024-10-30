/**
 * Input group to make the form quicker
 * @author wilpola
 */

import IPeople from "../App";
import peopleProvider from "../services/people";

export const Form = ({
  newPerson,
  setNewPerson,
  people,
  setPeople,
  nextId,
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
        if (
          confirm(
            `${newPerson.name} is already added to the phonebook. \nWould you like to replace the old number with the provided new one?`
          )
        ) {
          // Find the id of the matching object in the database
          const obj = people.find(
            (x: any) => x.name.toLowerCase() === newPerson.name.toLowerCase()
          );

          // Add to People
          setPeople([
            ...people,
            {
              name: newPerson.name,
              phone: newPerson.phone,
              id: nextId.toString(),
            },
          ]);

          // Post to the "database"
          peopleProvider
            .update(obj.id, newPerson)
            .then((res) => {
              console.log(res);
              setNewPerson({ name: "", phone: "", id: nextId });
            })
            .catch((err) => console.log(err));
        }
      } else {
        setPeople([
          ...people,
          {
            name: newPerson.name,
            phone: newPerson.phone,
            id: nextId.toString(),
          },
        ]);
        
        peopleProvider
          .create(newPerson, nextId)
          .then((res) => {
            console.log(res);
            setNewPerson({ name: "", phone: "", id: nextId });
          })
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
