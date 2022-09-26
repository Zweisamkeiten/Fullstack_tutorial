// vim: set ft=javascriptreact :

import axios from "axios";
import { useEffect, useState } from "react";

const api_key = process.env.REACT_APP_API_KEY;

const Content = ({ countriesToShow, setcountriesToShow }) => {
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
  const [weather, setweather] = useState({});
  const name = theCountry.name.common;
  const capital = theCountry.capital[0];
  const area = theCountry.area;
  const languages = Object.entries(theCountry.languages);
  const flag = theCountry.flags.png;

  useEffect(() => {
    const lat = theCountry.capitalInfo.latlng[0];
    const lon = theCountry.capitalInfo.latlng[1];
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`;
    axios.get(api_url).then((response) => {
      setweather(response.data);
    });
  }, [theCountry]);

  if (Object.keys(weather).length !== 0) {
    const temp = weather.main.temp;
    const windspeed = weather.wind.speed;
    const weatherimgurl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
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
        <h1>Weather in {capital}</h1>
        <p>temperature {temp} Celcius</p>
        <img src={weatherimgurl} alt="weather" />
        <p>wind {windspeed} m/s</p>
      </div>
    );
  }

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
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
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
      <Content
        countriesToShow={countriesToShow}
        setcountriesToShow={setcountriesToShow}
      />
    </div>
  );
};

export default App;
