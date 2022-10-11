const AddPerson = (props) => {
    return(
        <form>
            <div>
                Name : <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
             Number : <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
                <button onClick={props.handleNewPerson}>ADD</button>
            </div>
        </form>
    )
}

export default AddPerson