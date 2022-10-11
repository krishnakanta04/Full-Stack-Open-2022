import axios from 'axios'
import {useState, useEffect} from 'react'

const CountryDetails = ({country}) => {
    console.log('2render')
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_OPENWEATHER_API_URL}?q=${country.capital[0]}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)
            .then(res => {
                // console.log(res.data)
                setWeather(res.data)
            })
    }, [country.capital])

    return(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital : {country.capital[0]}</p>
            <p>Area : {country.area} Km<sup>2</sup></p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => 
                    <li key={lang}>{lang}</li>)
                }
            </ul>
            <img src={`${country.flags.png}`} alt={`Flag of ${country.name.common}`}/>

            <h2>Weather in {country.capital[0]}</h2>
            {weather.weather
                ? <>
                    <p>Temperature : {weather.main.temp} &deg;C</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='NA' />
                    <p>Wind : {weather.wind.speed} m/s</p>
                 </>
                : <p>Failed to load weather data</p>
            }
            
        </>
    )
}

export default CountryDetails