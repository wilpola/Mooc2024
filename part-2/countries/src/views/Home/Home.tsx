// This is where the actual app code resides.

import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Table as TableIcon, X } from "lucide-react";
import type { ICountry } from "./CountryTypes";

import { CountryTable } from "./CountryTable";
import { Button } from "@/components/ui/button";
import { CountryList } from "./CountryList";
import { CountryGrid } from "./CountryGrid";

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
          <CountryList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setVisible={setVisible}
            visible={visible}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="grid">
          <CountryGrid
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setVisible={setVisible}
            visible={visible}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="table">
          <CountryTable
            setVisible={setVisible}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            visible={visible}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
