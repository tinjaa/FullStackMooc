import React from 'react'

const Person = ({person, handleDelete}) => (
        <div>
            <span>{person.name} {person.number}</span>
            <button onClick={() => handleDelete(person.name,person.id)}>Delete</button>
        </div>
)

export default Person