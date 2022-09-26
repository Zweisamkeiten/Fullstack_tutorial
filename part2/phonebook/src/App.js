// vim: set ft=javascriptreact :

const App = () => {
  const [persons, setpersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setnewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  );
};

export default App;
