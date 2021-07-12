import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Countries from './Components/Countries';
import Filter from './Components/Filter'
import Country from './Components/Country'


const App = () => {
  console.log(process.env.REACT_APP_WHEATHER_API_KEY)

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })      
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleClick = (country) => {
  setNewFilter(country.name)
  }

  return (
    <div>
      <Filter filterChange={handleFilterChange}/>
      <Countries countries={countries.filter(country =>
        country.name.toLowerCase().includes(newFilter.toLowerCase()))}
        filter={newFilter}
        setFilter={setNewFilter}
        />
    </div>
  )

}

export default App;
