import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Country = (country) => {
    const [weather, setWeather] = useState([])
    const axios = require('axios')
    const API_KEY = process.env.REACT_APP_API_KEY;
    const params = {
        access_key: API_KEY,
        query: country.country.capital
    }

    useEffect(() => {
        console.log('effect2')
        axios
            .get('http://api.weatherstack.com/current',{params})
            .then(response => {
                setWeather(response.data.current)
                console.log(response.data.current)
            }).catch(error => {
                console.log(error)
            })
    }, [])      
     

    console.log(country)
    console.log(country.country.languages)
    return (
        <div>
                <h2>{country.country.name}</h2>
                <p>capital: {country.country.capital}
                <br></br>
                population: {country.country.population}</p>
                <h3>languages</h3>
                <ul>{country.country.languages.map(language =>
                    <li key={language.iso639_1}>
                            {language.name}                           
                    </li>)}
                </ul>
                <img src={country.country.flag} width="200" height="150"></img>
                <h3>Weather in {country.country.capital}</h3>
                <h4>temperature: {weather.temperature} Celcius</h4>
                <img src={weather.weather_icons} width="100" height="100"></img>
                <h4>wind: {weather.wind_speed} mph direction {weather.wind_dir}</h4>
        </div>
    )
}

export default Country