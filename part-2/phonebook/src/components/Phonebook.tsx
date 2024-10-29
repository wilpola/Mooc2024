/**
 *
 * Render the phonebook with the filtered elements
 * @author wilpola
 */

import { Trash2 } from "lucide-react";
import { useEffect } from "react";

import peopleProvider from "../services/people";

interface IPeople {
  id: number;
  name: string;
  phone?: string;
}

export const PhoneBook = ({
  filtered,
  setFiltered,
  phonebook,
  setPhoneBook,
  people,
}: any) => {
  // Update based on filtered content
  useEffect(() => {
    if (filtered === "") {
      setPhoneBook(people);
    } else {
      setPhoneBook(
        people.filter((person: IPeople) =>
          person.name.toLowerCase().includes(filtered.toLowerCase())
        )
      );
    }
  }, [filtered, people]);
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">People</h2>
          <input
            className="px-2 py-1 border rounded-md"
            placeholder="Filter"
            value={filtered}
            onChange={(e) => setFiltered(e.target.value)}
          />
        </div>
        <table className="outline outline-1 rounded-md overflow-hidden outline-slate-200 inset-1 shadow-md shadow-neutral-300">
          <thead>
            <tr className="font-semibold bg-gray-300">
              <td className="pl-2">Name</td>
              <td>Number</td>
              <td className="w-[80px]">Actions</td>
            </tr>
          </thead>
          <tbody>
            {phonebook
              .sort((a: IPeople, b: IPeople) => (a.name > b.name ? 1 : -1))
              .map((i: any, k: number) => {
                return (
                  <tr
                    key={k}
                    className="even:bg-slate-200 odd:bg-white last:rounded-b-md h-10 hover:bg-blue-200 hover:cursor-pointer"
                  >
                    <td className="capitalize pl-2">{i.name}</td>
                    <td className="capitalize">{i?.phone}</td>
                    <td className="mx-auto">
                      <Trash2
                        className="w-full hover:cursor-pointer hover:text-red-500"
                        onClick={() => {
                          if (confirm(`Delete ${i.name}?`)) {
                            peopleProvider.remove(i.id);
                          } else {
                            return;
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
