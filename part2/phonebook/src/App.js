// vim: set ft=javascriptreact :

import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";
import Persons from "./componments/Persons";
import Filter from "./componments/Filter";
import PersonForm from "./componments/PersonForm";
import Notification from "./componments/Notification";

const App = () => {
  const [persons, setpersons] = useState([]);
  const [newName, setnewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");
  const [personToShow, setpersonToShow] = useState(persons);
  const [message, setmessage] = useState(null);
  const [notifyStatus, setnotifyStatus] = useState("success");

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
    const duplicate = persons.filter((person) => person.name == newName);
    if (duplicate.length === 1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        // do update
        const updatePerson = { ...duplicate[0], number: newNumber };
        personService
          .update(updatePerson.id, updatePerson)
          .then((returnedPerson) => {
            setpersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setpersonToShow(
              persons
                .map((person) =>
                  person.id !== returnedPerson.id ? person : returnedPerson
                )
                .filter((p) =>
                  p.name.toLowerCase().match(newFilter.toLowerCase())
                )
            );
            setnewName("");
            setnewNumber("");
            setnotifyStatus("success");
            setmessage(
              `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`
            );
            setTimeout(() => {
              setmessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setnotifyStatus("error");
            setmessage(
              `Information of ${updatePerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setmessage(null);
            }, 5000);
          });
        return;
      }
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(person).then((returnedPerson) => {
      setpersons(persons.concat(returnedPerson));
      setpersonToShow(
        persons
          .concat(returnedPerson)
          .filter((p) => p.name.toLowerCase().match(newFilter.toLowerCase()))
      );
      setnewName("");
      setnewNumber("");
      setnotifyStatus("success");
      setmessage(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setmessage(null);
      }, 5000);
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then((returnedinfo) => {
        setpersons(persons.filter((p) => p.id !== person.id));
        setpersonToShow(personToShow.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} notifyStatus={notifyStatus} />
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
      <Persons persons={personToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
