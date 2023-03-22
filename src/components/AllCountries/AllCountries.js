import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);

      if (!res.ok) throw new Error("Error!");

      const data = await res.json();

      console.log(data);

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
    <div className="wrap">
      <div className="countries">
        {isLoading && !error && <h4 className="loader"></h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="countries-card">
              <div className="countries-img">
                <img src={country.flags.png} alt="{country.flags.alt}" />
              </div>

              <div className="countries-data">
                <h3> {country.name.common} </h3>
                <h6>
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h6>
                <h6> Region: {country.region} </h6>
                <h6> Capital: {country.capital} </h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default AllCountries;
