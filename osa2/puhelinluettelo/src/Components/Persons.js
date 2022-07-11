import React from 'react'
import Person from './Person'


const Persons = ({persons, newFilter, handleDelete}) => {

    return (
        <div>
            {persons.map((person) => {
                    if(newFilter.length === 0 || person.name.search(newFilter) !== -1) {
                        return (
                             <Person key={person.id} person={person} handleDelete={() => handleDelete(person.name,person.id)}/>
                         )
                     } else {
                         return null
                     }
            })}
        </div>
    )
}

export default Persons