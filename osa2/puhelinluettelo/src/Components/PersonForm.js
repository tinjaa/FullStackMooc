import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <div>
        <h3>Add a new</h3>
        <form onSubmit={addPerson}>
            <div>
                <label>name: </label>
                <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <label>number: </label>
                <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    </div>
)

export default PersonForm
