import React, { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map((person) => person.name)
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterChange={handleFilterChange}
        />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} 
      newName={newName} nameChange={handleNameChange}
      newNumber={newNumber} numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}/>
    </div>
  )
}

export default App
