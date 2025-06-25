
import React from 'react';
import type { ICountry } from './CountryTypes';
import { Label } from '@/components/ui/label';

export const DisplayCountry: React.FC<{ country: ICountry }> = ({ country }) => {
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
        <div className="text-sm">
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