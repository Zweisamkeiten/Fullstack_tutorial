// vim: set ft=javascriptreact :

import { useState } from "react";

const App = () => {
  const [newFind, setnewFind] = useState("");
  const [countries, setcountries] = useState([]);

  const handleFindChange = (event) => {
    setnewFind(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={newFind} onChange={handleFindChange} />
      </div>
      {countries.length === 1
        ? 1
        : countries.map((country) => <p>{country.name}</p>)}
    </div>
  );
};

export default App;
