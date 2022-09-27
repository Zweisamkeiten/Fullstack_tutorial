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

export default PersonForm;
