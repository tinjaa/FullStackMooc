import React from 'react'
import Person from './Person'


const Persons = ({persons, newFilter, setPersons}) => {
    return (
        <div>
            <table>
                <body>
                    {persons.map((person) => {
                        if(newFilter.length === 0 || person.name.search(newFilter) !== -1) {
                            return (
                                <Person key={person.id} person={person} setPersons={setPersons}/>
                            )
                        } else {
                            return null
                        }
                    })}
                </body>
            </table>
        </div>
    )
}

export default Persons