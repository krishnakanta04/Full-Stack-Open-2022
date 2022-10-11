const Numbers = ({person, remove}) => {
    return (
        <div>
            <span>{person.name}  {person.number}</span> 
            <button value={JSON.stringify(person)} onClick={remove}>Delete</button>
        </div>
    )
}

export default Numbers