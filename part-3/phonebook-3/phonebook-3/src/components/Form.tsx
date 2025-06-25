/**
 * Input group to make the form quicker
 * @author wilpola
 */

import React from "react";
import peopleProvider from "../services/people";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

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
      const isDuplicate = people.some(
        (person: { name: string }) =>
          person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      if (isDuplicate) {
        const x = people.filter((person: { name: string }) => {
          return person.name.toLowerCase() === newPerson.name.toLowerCase();
        });

        peopleProvider
          .update(x[0].id, newPerson)
          .then((res) => {
            setPeople(
              people.map((person: { id: string }) =>
                person.id === x[0].id ? res.data : person
              )
            );
            setNewPerson({ name: "", number: "" });
            toast(
              <div className="w-full">
                <h2 className="text-base font-semibold">
                  Person updated in the phonebook
                </h2>
                <p className="text-xs text-slate-500">ID: {res.data.id}</p>
                <div className="bg-neutral-800 rounded-md p-2 mt-2 text-white w-full">
                  <code className="font-normal">
                    Name: {res.data.name} <br />
                    Phone: {res.data.number}
                  </code>
                </div>
              </div>,
              {
                duration: 3000,
                icon: "👍",
                position: "bottom-right",
              }
            );
          })
          .catch((err) => {
            if (err.response.status === 403) {
              toast.error("Please fill all the fields correctly.", {
                position: "top-center",
                richColors: true,
              });
            } else if (err.response.status === 404) {
              toast.error("This person is not in the phonebook.", {
                position: "top-center",
                richColors: true,
              });
            } else {
              console.log(err);
            }
          });

        return;
      } else {
        peopleProvider
          .create(newPerson)
          .then((res) => {
            setPeople(people.concat(res.data));

            setNewPerson({ name: "", number: "" });
            toast(
              <div className="w-full">
                <h2 className="text-base font-semibold">
                  Person added to the phonebook
                </h2>
                <p className="text-xs text-slate-500">ID: {res.data.id}</p>
                <div className="bg-neutral-800 rounded-md p-2 mt-2 text-white w-full">
                  <code className="font-normal">
                    Name: {res.data.name} <br />
                    Phone: {res.data.number}
                  </code>
                </div>
              </div>,
              {
                duration: 3000,
                icon: "👍",
                position: "bottom-right",
              }
            );
          })
          .catch((err) => {
            if (err.response.status === 403) {
              toast.error("Please fill all the fields correctly.", {
                position: "top-center",
                richColors: true,
              });
            } else if (err.response.status === 409) {
              toast.error("This person is already in the phonebook.", {
                position: "top-center",
                richColors: true,
              });
            } else {
              console.log(err);
            }
          });
      }
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
