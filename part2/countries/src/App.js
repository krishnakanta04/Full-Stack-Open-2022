import axios from 'axios'
import {useState, useEffect} from 'react'

import Search from './components/Search'
import SearchedCountries from './components/SearchedCountries'
import CountryDetails from './components/CountryDetails'

const App = () => {
  console.log("Rendered!")

  const [countries, setCountries] = useState([]) // state to collect all countries details from endpoint
  const [filteredCountries, setFilteredCountries] = useState([]) // state to collect all filterd countries

  useEffect(() => { // getting all countries details from restcountries endpoint
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const filterCountry = (e) => { // filtering out the countries from input field
    if(!e.target.value){
      setFilteredCountries([])
    }
    
    const filteredResult = countries.filter(country => 
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredCountries(filteredResult)
  }

  const showCountryDetails = (e) => {
    // console.log('Clicked!')
    // console.log(JSON.parse(e.target.value))
    setFilteredCountries([JSON.parse(e.target.value)])
  }

  return(
    <>
      <Search filterCountry={filterCountry}/>
      {filteredCountries.length > 10 
        ? <p>Enter more specific name</p>
        : filteredCountries.length === 1 
          ? <CountryDetails country={filteredCountries[0]}/>
          : <SearchedCountries filteredCountries={filteredCountries} 
                               showCountryDetails={showCountryDetails}  
            />
      } 
    </>
  )
}

export default App