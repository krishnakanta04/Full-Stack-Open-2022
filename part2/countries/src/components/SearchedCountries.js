const CountriesNames = ({country, name, showCountryDetails}) => {
    return(
        <div>
            <span>{name}</span>
            <button onClick={showCountryDetails} value={JSON.stringify(country)}>Show</button>
        </div>
    )
}


const SearchedCountries = ({filteredCountries, showCountryDetails}) => {
    return(
        <div>
            {filteredCountries.map(country => 
                <CountriesNames key={country.name.common}
                                country={country}
                                name={country.name.common}
                                showCountryDetails={showCountryDetails}
                />     
            )}
                                                 
        </div>
    )
}

export default SearchedCountries