/**
 * Input group to make the form quicker
 * @author wilpola
 */

import React from "react";
import peopleProvider from "../services/people";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner"

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
            toast.error("Please fill all the fields correctly.");
          } else if (err.response.status === 409) {
            toast.error("This person is already in the database.");
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
        <Input
          id="name"
          className="px-2 py-1 border border-slate-400 rounded-md"
          placeholder="First last"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoFocus
          name="name"
          type="text"
          required
          pattern="[a-zA-ZÀ-ÖØ-öø-ÿ\s]+"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col justify-start">
        <label htmlFor="number">Phone</label>
        <Input
          id="number"
          className="px-2 py-1 border border-slate-400 rounded-md"
          placeholder="Phone"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          name="number"
          type="tel"
          required
          pattern="^\+?[0-9\s]+$"
          value={newPerson.number}
          onChange={(e) =>
            setNewPerson({ ...newPerson, number: e.target.value })
          }
        />
      </div>
      <Button
        className="text-white mt-2 py-2 px-4 bg-slate-700 hover:bg-slate-800"
        onClick={(e) => handleAddition(e)}
      >
        Add to Phonebook
      </Button>
    </form>
  );
};
