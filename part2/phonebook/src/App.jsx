import { useState } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import { useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)})
  }, [])



  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addNewName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName ,number:newNumber}
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService.update(existingPerson.id, updatedPerson).then((returnedPerson) => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('');
      });
      return;
    }
      
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
    })
    
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        alert(`The person '${personToDelete.name}' was already deleted from the server.`);
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

 const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App