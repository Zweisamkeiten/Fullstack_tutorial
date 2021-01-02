import React, { useState } from "react";

const Filter = ({ handleFilterChange, newFilter }) => {
	return (
		<div>
			filter shown with <input value={newFilter} onChange={handleFilterChange} />
		</div>
	);
};

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={handlePersonChange} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Person = ({ personsToShow }) => {
	return (
		<div>
			{personsToShow.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-642322" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [personsToShow, setPersonsToShow] = useState(persons);

	const addPerson = (event) => {
		event.preventDefault();
		for (var i = 0, len = persons.length; i < len; i++) {
			if (persons[i].name === newName) {
				window.alert(`${newName} is already added to phonebook`);
				return;
			}
		}
		//console.log("not contain");
		const newObject = {
			name: newName,
			number: newNumber,
			date: new Date().toISOString,
			id: persons.length + 1,
		};
		console.log(event.target);
		console.log(newObject);
		setPersons(persons.concat(newObject));
		setNewName("");
		setNewNumber("");
	};

	const handlePersonChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		console.log(event.target.value);
		setNewFilter(event.target.value);
		setPersonsToShow(
			persons.filter((person) => person.name.toLowerCase().match(event.target.value)),
		);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} handleFilterChange={handleFilterChange} />
			<h3>add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handlePersonChange={handlePersonChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Person personsToShow={personsToShow} />
		</div>
	);
};

export default App;
