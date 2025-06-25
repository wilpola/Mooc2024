import React from "react";
import { DisplayCountry } from "./DisplayCountry";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// import types
import type { ICountry } from "./CountryTypes";

export const CountryGrid: React.FC<{
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[95%] mx-auto">
        {visible.map((country) => (
          <Card
            className="hover:cursor-pointer hover:bg-neutral-200 p-1 rounded-lg"
            key={country.cca3}
            onClick={() => setSearchQuery(country.name.common)}
          >
            <CardHeader className="p-1 ">
              <div className="aspect-w-16 aspect-h-9 contain-content">
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="rounded-md origin-center aspect-video object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="p-1">
              <h3 className="font-semibold text-sm">{country.name.common}</h3>
              <p className="text-sm text-gray-500">{country.name.official}</p>
            </CardContent>
          </Card>
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
