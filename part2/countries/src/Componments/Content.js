// vim: set ft=javascriptreact :

import TheCountry from "./TheCountry";

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

export default Content;
