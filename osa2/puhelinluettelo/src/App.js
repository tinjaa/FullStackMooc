import React, { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
import personService from './services/PersonService'
import Alert from './Components/Alert.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [alert, setAlert] = useState(null)
  const [error, setErrorAlert] = useState(null)

  const timer = 3000

  useEffect(() => {
    console.log('effect')
    personService
      .getAll
      .then(response => 
        setPersons(response))    
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    personService.query(newName).then(person => {
      const newObject = {
        'name': newName,
        'number' : newNumber
      }
    
      if(person) {
        const alert = `${newName} is already added to phonebook, replace the old number with a new one?`
        if(window.confirm(alert)) {
          personService
            .update(person.id, newObject)
              .then(() => {
                personService
                  .getAll()
                    .then(result => setPersons(result))
        setAlert(`Added ${newName}`)
        setTimeout(() => setErrorAlert(null), timer)
          }).catch(error => {
            setErrorAlert(error.response.data.error)
            setTimeout(() => setErrorAlert(null), timer)            
          })
        }
      } else {
        personService.create(newObject).then(() => {
          personService
            .getAll()
              .then(response => setPersons(response))
          setNewName('')
          setNewNumber('')
          setAlert(`Added ${newName}`)
          setTimeout(() => setAlert(null), timer)
        }).catch(error => {
          setErrorAlert(error.response.data.error)
          setTimeout(() => setErrorAlert(null), true)
        })
      }
    })
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
    </div>
  )
}

export default App
