import React from 'react'

const Filter = (props) => {
    const {filterChange} = props
    return (
        <form>
            <div>
                filter shown with
                <input
                    onChange={filterChange}
                />
            </div>
        </form>
    )
}

export default Filter
