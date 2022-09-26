// vim: set ft=javascriptreact :

import axios from "axios";
import { useEffect, useState } from "react";

const Countries = ({ countriesToShow, setcountriesToShow }) => {
  if (countriesToShow.length === 1) {
    return <TheCountry theCountry={countriesToShow[0]} />;
  }

  return (
    <div>
      {countriesToShow.length === 0 ? (
        <p>Too many matches, sepcify another filter</p>
      ) : (
        countriesToShow.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setcountriesToShow([country])}>show</button>
          </div>
        ))
      )}
    </div>
  );
};

const TheCountry = ({ theCountry }) => {
  const name = theCountry.name.common;
  const capital = theCountry.capital[0];
  const area = theCountry.area;
  const languages = Object.entries(theCountry.languages);
  const flag = theCountry.flags.png;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={flag} alt="flag" />
    </div>
  );
};

const App = () => {
  const [newFind, setnewFind] = useState("");
  const [countries, setcountries] = useState([]);
  const [countriesToShow, setcountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/countries").then((response) => {
      setcountries(response.data);
    });
  }, []);

  const handleFindChange = (event) => {
    setnewFind(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setcountriesToShow(filteredCountries.length > 10 ? [] : filteredCountries);
  };

  return (
    <div>
      <div>
        find countries <input value={newFind} onChange={handleFindChange} />
      </div>
      <Countries
        countriesToShow={countriesToShow}
        setcountriesToShow={setcountriesToShow}
      />
    </div>
  );
};

export default App;
