/**
 *
 * Render the phonebook with the filtered elements
 * @author wilpola
 */

import { useEffect } from "react";

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
        {phonebook
          .sort((a: IPeople, b: IPeople) => (a.name > b.name ? 1 : -1))
          .map((i: any, k: number) => {
            return (
              <p key={k} className="capitalize">
                {i.name} {i?.phone}
              </p>
            );
          })}
      </div>
    </>
  );
};
