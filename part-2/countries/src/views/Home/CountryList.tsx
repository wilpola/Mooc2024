import React, { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import type { ICountry } from "./CountryTypes";
import { DisplayCountry } from "./DisplayCountry";

export const CountryList: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setVisible: (countries: ICountry[]) => void;
  visible: ICountry[];
  loading: boolean;
}> = ({ searchQuery, setSearchQuery, visible, loading, setVisible }) => {
  // If there are 2 - 10 countries, display them in a table
  if (visible.length >= 2 && visible.length <= 10) {
    visible.map((country) => {
      if (searchQuery.toLowerCase() === country.name.common.toLowerCase()) {
        setVisible([country]);
      }
    });

    return (
      <div className="flex flex-col gap-1 mb-5">
        {visible.map((country) => (
          <div
            className="border p-2 rounded grid grid-cols-[60px_auto] gap-2 hover:cursor-pointer hover:bg-neutral-200"
            key={country.cca3}
            onClick={() => setSearchQuery(country.name.common)}
          >
            <div className="object-fill self-center">
              <Suspense>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="h-auto w-full max-w-[320px] rounded-md"
                />
              </Suspense>
            </div>
            <div className="">
              <h3 className="font-semibold text-sm">{country.name.common}</h3>
              <p className="text-sm text-gray-500">{country.name.official}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (visible.length === 1) {
    return <DisplayCountry country={visible[0]} />;
  } else {
    if (visible.length === 0) {
      // If there are no countries, display a message
      return (
        <>
          <h3 className="font-semibold text-neutral-900 text-lg mb-2">
            No countries found.
          </h3>
          <p>Please refine your search.</p>
        </>
      );
    }
  }
  return (
    <div className=" text-gray-500">
      <h3 className="font-semibold text-neutral-900 text-lg mb-2">
        Too many countries to display in a table.
      </h3>{" "}
      <p>Please refine your search.</p>
      <p>Current number of countries in memory: {visible.length}</p>
    </div>
  );
};
