import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

function CountryInfo() {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  const getCountryByName = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);

      if (!res.ok) throw new Error("Could not found!");

      const data = await res.json();

      setCountry(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getCountryByName();
  }, []);

  return (
    <Box className="wrap-country">
      {isLoading && !error && <Box className="loader"></Box>}
      {error && !isLoading && { error }}

      {country.map((country) => (
        <Box className="country-container" key={country.toString()}>
          <Box className="row">
            <Box className="country-img">
              <img src={country.flags.png} alt="" />
            </Box>

            <button>
              <Link to="/">
                <Typography variant="span">Back to list</Typography>
              </Link>
            </button>
          </Box>

          <Box className="country-info">
            <Typography variant="h3">{country.name.common}</Typography>

            <Box className="country-info-details">
              <Typography variant="h5">
                Region: <span>{country.region}</span>
              </Typography>
              <Typography variant="h5">
                Sub Region: <span>{country.subregion}</span>
              </Typography>
              <Typography variant="h5">
                Capital: <span>{country.capital}</span>
              </Typography>
              <Typography variant="h5">
                Country Code: {country.idd.root}
                {country.idd.suffixes}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CountryInfo;
