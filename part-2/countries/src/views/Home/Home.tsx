// This is where the actual app code resides.

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Table as TableIcon, X } from "lucide-react";
import type { ICountry } from "./CountryTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [visible, setVisible] = useState<ICountry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all ")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
        setVisible(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setVisible(countries);
    } else {
      const query = searchQuery.toLowerCase();
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
      setVisible(filteredCountries);
    }
  }, [searchQuery, countries]);

  return (
    <div className="max-w-screen-lg mx-auto w-[95%] mt-10">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search countries..."
          className="mb-4"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          disabled={loading}
        />
        {searchQuery !== "" && (
          <Button
            size={"icon"}
            variant="ghost"
            className="absolute right-2 top-0 rounded-full"
            onClick={() => {
              setSearchQuery("");
              setVisible(countries);
            }}
          >
            <X size={4} className="cursor-pointer rounded-full" />
          </Button>
        )}
      </div>
      {loading && <Skeleton className="h-10 w-full mb-4" />}
      <Tabs defaultValue="list" className="w-full">
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Countries List</h1>
          <TabsList className="">
            <TabsTrigger value="list" className="flex items-center">
              <List size={20} className="" /> List
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid size={20} className="" /> Grid
            </TabsTrigger>
            <TabsTrigger value="table">
              <TableIcon size={20} className="" /> Table
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="list">
          {visible.map((country) => (
            <div className="border p-2 rounded" key={country.cca3}>
              {country.name.common}
            </div>
          ))}
        </TabsContent>
        <TabsContent value="table">
          {visible.length > 10 ? (
            <div className=" text-gray-500">
              <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                Too many countries to display in a table.
              </h3>{" "}
              <p>Please refine your search.</p>
              <p>Current number of countries in memory: {visible.length}</p>
            </div>
          ) : visible.length > 1 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Population</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((country) => (
                  <TableRow key={country.cca3}>
                    <TableCell>{country.name.common}</TableCell>
                    <TableCell>{country.region}</TableCell>
                    <TableCell>{country.population.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSearchQuery(country.name.common)}
                      >
                        Show
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    Total Countries: {visible.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : visible.length === 1 ? (
            <DisplayCountry country={visible[0]} />
          ) : (
            <>
              <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                No countries found.
              </h3>
              <p>Please refine your search.</p>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DisplayCountry: React.FC<{ country: ICountry }> = ({ country }) => {
  return (
    <div className=" p-2 rounded mb-2 grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-3 ">
      {/* Country */}
      <div className="col-span-full">
        <h2 className="text-lg font-semibold">{country.name.common}</h2>
        <p className="text-sm text-gray-500">{country.name.official}</p>
      </div>

      {/* Flag image */}
      <div className="flex flex-col w-full">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="h-auto w-full max-w-[320px] rounded-md"
        />
      </div>

      {/* Details */}
      <div className="flex max-md:flex-col gap-4 md:flex-row justify-left md:gap-12 w-full md:col-span-2">
        <div className="text-sm" >
          <Label className="text-sm font-semibold mb-1">Details</Label>
          <p>Capital: {country.capital[0]}</p>
          <p>Region: {country.region}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>

        {/* Languages */}
        <div className="">
          <Label className="text-sm font-semibold mb-1">Languages</Label>
          <ul className="">
            {Object.values(country.languages).map((lang, i) => (
              <li key={i} className="text-sm list-none">
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
