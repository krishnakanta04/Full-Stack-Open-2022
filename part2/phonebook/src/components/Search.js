const SearchedNames = ({similarName}) => {
    return(
        <div>
            <p>{similarName.name}</p>
        </div>
    )
}

const Search = ({findName, similarNames}) => {
    return(
        <>
            <div>
            Search : <input onChange={findName}/>           
            </div>
            <div>
            {similarNames.map(similarName => 
                <SearchedNames  key={similarName.id} similarName={similarName} />    
            )}
            </div>
        </>
    )
}

export default Search