import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CountryInfo() {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
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

    getCountryByName();
  }, [id]);

  return (
    <div className="wrap-country">
      {isLoading && !error && <h4 className="loader"></h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country-container" key={index}>
          <div className="row">
            <div className="country-img">
              <img src={country.flags.png} alt="" />
            </div>

            <button>
              <Link to="/">
                <span>Back to list</span>
              </Link>
            </button>
          </div>

          <div className="country-info">
            <h3>{country.name.common}</h3>

            <div className="country-info-details">
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <h5>
                Country Code: {country.idd.root}
                {country.idd.suffixes}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountryInfo;
