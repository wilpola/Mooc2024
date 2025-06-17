/**
 * Input group to make the form quicker
 * @author wilpola
 */

import peopleProvider from "../services/people";

export const Form = ({ newPerson, setNewPerson, people, setPeople }: any) => {
  const handleAddition = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault(); // Prevent refresh

    /**
     * Check for duplicates in the object array
     * @returns boolean true / false
     */
    // dont submit empty data
    if (newPerson.name !== "" && newPerson.name !== " ") {
      peopleProvider
        .create(newPerson)
        .then((res) => {
          setPeople(people.concat(res.data.person));
          setNewPerson({ name: "", number: "" });
        })
        .catch((err) => {
          if (err.response.status === 403) {
            alert("Please fill all the fields correctly.");
          } else if (err.response.status === 409) {
            alert("This person is already in the database.");
          } else {
            console.log(err);
          }
        });
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
          value={newPerson.number}
          onChange={(e) =>
            setNewPerson({ ...newPerson, number: e.target.value })
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
