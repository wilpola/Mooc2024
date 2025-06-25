/**
 *
 * Render the phonebook with the filtered elements
 * @author wilpola
 */

import React from "react";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

import peopleProvider from "../services/people";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface IPeople {
  id: string;
  name: string;
  number?: string;
}

export const PhoneBook = ({
  people,
  filtered,
  phonebook,
  setPeople,
  setFiltered,
  setPhoneBook,
}: {
  filtered: string;
  people: IPeople[];
  phonebook: IPeople[];
  setFiltered: React.Dispatch<React.SetStateAction<string>>;
  setPeople: React.Dispatch<React.SetStateAction<IPeople[]>>;
  setPhoneBook: React.Dispatch<React.SetStateAction<IPeople[]>>;
}) => {
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
  }, [filtered, people, setPhoneBook]);
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold">People ({phonebook.length})</h2>
          {/* Filter the people in the phonebook */}
          <Input
            className="px-2 py-1 border rounded-md max-w-[320px]"
            placeholder="Filter by name"
            type="text"
            autoComplete="off"
            value={filtered}
            onChange={(e) => setFiltered(e.target.value)}
          />
        </div>
        <table className="rounded-sm overflow-hidden outline-slate-200 inset-1 shadow-md shadow-neutral-300">
          <thead>
            <tr className="font-semibold bg-gray-300 text-slate-600 h-10">
              <td className="pl-2">Name</td>
              <td>Number</td>
              <td className="w-[80px] text-center">Actions</td>
            </tr>
          </thead>
          <tbody>
            {phonebook
              .sort((a: IPeople, b: IPeople) => (a.name > b.name ? 1 : -1))
              .map((i: IPeople, k: number) => {
                return (
                  <tr
                    key={k}
                    className="even:bg-indigo-100 odd:bg-white last:rounded-b-sm h-10 hover:cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(i.id.toString());
                      toast(
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold">
                            {i.name.split(" ")[0].charAt(0).toUpperCase() +
                              i.name.split(" ")[0].substring(1).toLowerCase()}
                            's copied to clipboard!
                          </h3>
                          <p className="text-xs text-slate-400">
                            {i.id.toString()}
                          </p>
                        </div>,
                        {
                          action: {
                            label: "dismiss",
                            onClick: () => {
                              toast.dismiss();
                            },
                          },
                        }
                      );
                    }}
                  >
                    <td className="capitalize pl-2">{i.name}</td>
                    <td className="capitalize">{i?.number}</td>
                    <td className="mx-auto w-[80px] h-full flex justify-center items-center py-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            asChild
                            className=" w-[40px] mx-auto hover:bg-neutral-100 px-1"
                            size={"default"}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Trash2
                              className="w-[20px] hover:cursor-pointer hover:text-red-600"
                              aria-label="Delete person"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              You are about to delete <strong>{i.name}</strong>{" "}
                              from the phonebook. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className="border-neutral-400"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-white hover:bg-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                
                                // Remove the person from the phonebook
                                peopleProvider.remove(i.id).then(() => {
                                  setPhoneBook(
                                    phonebook.filter(
                                      (person: IPeople) => person.id !== i.id
                                    )
                                  );
                                  setPeople(
                                    phonebook.filter(
                                      (person: IPeople) => person.id !== i.id
                                    )
                                  );
                                });
                                toast.success(`${i.name} has been deleted.`, {
                                  action: {
                                    label: "dismiss",
                                    onClick: () => {
                                      toast.dismiss();
                                    },
                                  },
                                });
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h4 className="text-center mt-2 font-semibold text-slate-400 text-sm">
          Pssst! You can copy the user id by clicking the row :)
        </h4>
      </div>
    </>
  );
};
