import { useState, useEffect } from 'react';

import phoneService from './services/phones';

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} />
  </div>
);

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newPhone} onChange={handlePhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons, setPersons, filter }) => {
  return persons
    .filter((person) =>
      filter === ''
        ? true
        : person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => {
      return (
        <Person
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      );
    });
};

const Person = ({ person, persons, setPersons }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((e) => e.id !== person.id));
      });
    }
  };

  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification"> {message} </div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = { name: newName, number: newPhone };

    if (persons.some((e) => e.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        phoneService.update(id, person).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
        });
        setNewName('');
        setNewPhone('');
        setMessage(`${person.name} number was changed.`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      return;
    }

    phoneService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewPhone('');
      setMessage(`${person.name} was added.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
