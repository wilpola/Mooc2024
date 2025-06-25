import React from "react";
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

export const CountryTable: React.FC<{
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
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Flag</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Population</TableHead>
            <TableHead className="max-w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((country) => (
            <TableRow key={country.cca3}>
              <TableCell>{country.flag}</TableCell>
              <TableCell>{country.name.common}</TableCell>
              <TableCell>{country.region}</TableCell>
              <TableCell>{country.population.toLocaleString()}</TableCell>
              <TableCell className="max-w-[70px]">
                <Button
                  variant="outline"
                  className="w-full max-w-[60px]"
                  size={"sm"}
                  disabled={loading}
                  aria-label={`Show details for ${country.name.common}`}
                  onClick={() => setSearchQuery(country.name.common)}
                >
                  Show
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
