const Search = ({filterCountry}) => {
    return(
        <div>
            <label htmlFor='country-name'>Enter country name : </label>
            <input type='text' onChange={filterCountry} id='country-name'/>
        </div>
    )
}

export default Search