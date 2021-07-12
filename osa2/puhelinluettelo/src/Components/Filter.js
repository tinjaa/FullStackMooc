import React from 'react'

const Filter = ({newFilter, setNewFilter, handleFilterChange}) => {
    return (
        <div>
            filter shown with
            <input
                value={newFilter}
                onChange={handleFilterChange(setNewFilter)}
            />
        </div>
    )
}

export default Filter

