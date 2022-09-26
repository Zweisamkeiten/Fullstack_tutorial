// vim: set ft=javascriptreact :

import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  inputName,
  handleNameChange,
  inputNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={inputName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={inputNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ personToShow }) => {
  return (
    <div>
      {personToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setpersons] = useState([]);
  const [newName, setnewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");
  const [personToShow, setpersonToShow] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setpersons(response.data);
      setpersonToShow(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    // 防止用户能够添加已经存在于电话簿中的名字
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setpersons(persons.concat(person));
    setnewName("");
    setnewNumber("");
  };

  const handleNameChange = (event) => {
    setnewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setnewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setnewFilter(event.target.value);
    setpersonToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        inputName={newName}
        handleNameChange={handleNameChange}
        inputNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
