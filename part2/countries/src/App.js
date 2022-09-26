// vim: set ft=javascriptreact :

import axios from "axios";
import { useEffect, useState } from "react";
import Content from "./Componments/Content";

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
