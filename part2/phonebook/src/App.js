// vim: set ft=javascriptreact :

import { useEffect, useState } from "react";
import personService from "./services/persons";

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

const Persons = ({ personToShow, setpersonToShow }) => {
  return (
    <div>
      {personToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                personService.remove(person.id).then((returnedinfo) => {
                  console.log(returnedinfo);
                  setpersonToShow(
                    personToShow.filter((p) => p.id !== person.id)
                  );
                });
              }
            }}
          >
            delete
          </button>
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
    personService.getAll().then((initialPersons) => {
      setpersons(initialPersons);
      setpersonToShow(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    // 防止用户能够添加已经存在于电话簿中的名字
    if (persons.filter((person) => person.name == newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(person).then((returnedPerson) => {
      setpersons(persons.concat(returnedPerson));
      setnewName("");
      setnewNumber("");
    });
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
      <Persons personToShow={personToShow} setpersonToShow={setpersonToShow} />
    </div>
  );
};

export default App;
