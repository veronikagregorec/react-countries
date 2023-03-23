import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);

      if (!res.ok) throw new Error("Error!");

      const data = await res.json();

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setError(error.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <Box className="wrap">
      <Box className="countries">
        {isLoading && !error && <Box className="loader"></Box>}
        {error && !isLoading && <Typography variant="h4">{error}</Typography>}

        {countries.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <Box className="countries-card" key={country.toString()}>
              <Box className="countries-img">
                <img src={country.flags.png} alt="{country.flags.alt}" />
              </Box>

              <Box className="countries-data">
                <Typography variant="h3"> {country.name.common} </Typography>
                <Typography variant="h6"> Region: {country.region} </Typography>
                <Typography variant="h6">Capital: {country.capital}</Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
export default AllCountries;
