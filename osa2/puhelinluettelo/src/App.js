import React, { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/PersonService'
import Notification from './Components/Notification.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const timer = 3000

  useEffect(() => {
    personService
      .getAll()
      .then(response =>
        setPersons(response))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(persons => persons.name.trim().toLowerCase())

    if(names.includes(newName.trim().toLowerCase())) {
      const alert = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(alert)) {

        const existingPerson = persons.find(person =>person.name.trim().toLowerCase() === newName.trim().toLowerCase())
        console.log(existingPerson.id)

        personService
          .update(existingPerson.id, newPerson)
          .then(() => {
            personService
              .getAll()
              .then(result => setPersons(result))
            showNotification(`Updated ${newName}`,false)
            setTimeout(() => setMessage(null), timer)
          }).catch(error => {
            showNotification(`Information of ${newName} has already been removed from server`,true)
            setTimeout(() => setMessage(null), timer)
            personService.getAll().then(response => setPersons(response))
          })
      }
    } else {
      personService.create(newPerson).then(() => {
        personService
          .getAll()
          .then(response => setPersons(response))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`,false)
      }).catch(error => {
        showNotification(error.response.data.error,true)
      })
    }
  }
  

  const handleDelete = (name, id) => {
    const alert = `Are you sure you want to delete ${name}`
    console.log(alert)

    if (window.confirm(alert)) {
      personService.delete(id)
        .then(() => {
          personService.getAll().then(response => setPersons(response))
          showNotification(`${name} successfully deleted`,false)
        })
        .catch(error => {
          showNotification(`${name} was already deleted from the server`,true)
          personService.getAll().then(response => setPersons(response))
        })
    }
  }

  const showNotification = (message, isError) => {
    setError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 5000)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification 
        message={message}
        error={error} />

      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange} />

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons 
        persons={persons} 
        newFilter={newFilter} 
        handleDelete={handleDelete} />

    </div>
  )
}

export default App
