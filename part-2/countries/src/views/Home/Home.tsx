// This is where the actual app code resides.

import React, { useState, useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all ")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  } else {
    return (
      <div className="max-w-screen-lg mx-auto w-[95%] mt-10">
        <h1 className="text-2xl font-semibold mb-5">Countries List</h1>
      </div>
    );
  }
};

export default Home;
