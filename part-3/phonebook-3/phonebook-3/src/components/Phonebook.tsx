/**
 *
 * Render the phonebook with the filtered elements
 * @author wilpola
 */

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
  setPeople,
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
            <tr className="font-semibold bg-gray-300">
              <td className="pl-2">Name</td>
              <td>Number</td>
              <td className="w-[80px] text-center">Actions</td>
            </tr>
          </thead>
          <tbody>
            {phonebook
              .sort((a: IPeople, b: IPeople) => (a.name > b.name ? 1 : -1))
              .map((i: any, k: number) => {
                return (
                  <tr
                    key={k}
                    className="even:bg-slate-200 odd:bg-white last:rounded-b-sm h-10 hover:cursor-pointer"
                  >
                    <td className="capitalize pl-2">{i.name}</td>
                    <td className="capitalize">{i?.number}</td>
                    <td className="mx-auto w-[80px] h-full flex justify-center items-center py-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" asChild className=" w-[40px] mx-auto hover:bg-neutral-100 px-1" size={"default"}>
                            <Trash2
                              className="w-[20px] hover:cursor-pointer hover:text-red-600"
                              aria-label="Delete person"
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
                            <AlertDialogCancel className="border-neutral-400">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-white hover:bg-red-600"
                              onClick={() => {
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
      </div>
    </>
  );
};
