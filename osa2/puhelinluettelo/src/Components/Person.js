import React from 'react'
import personService from '../services/PersonService'

const Person = props => {
    const {person, setPersons} = props

    const handleDelete = () => {
        const alert = -`Delete ${person.name}`

        if(window.confirm(alert)) {
            personService.delete(person.id)
            personService.getAll().then(response => setPersons(response))
        }
    }

    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}

export default Person