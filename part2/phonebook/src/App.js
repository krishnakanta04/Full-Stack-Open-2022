import { useState, useEffect } from "react"

import Search from './components/Search'
import Heading from "./components/Heading"
import AddPerson from "./components/AddPerson"
import Numbers from "./components/Numbers"
import Notification from "./components/Notification"

import recordService from "./services/records"

const App = () => {
  // console.log("rendered!")
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [similarNames, setSimilarNames] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    recordService
      .getAll()
      .then(response => { 
        setPersons(response) 
      })
  }, [])
  
  const handleNewPerson = (e) => {
    e.preventDefault()

    if(!(newName && newNumber)){
      alert('Empty name or number can\'t be added')
      return
    }

    const checkPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if(checkPerson){
      if(window.confirm(`${checkPerson.name} is already added to the phonebook. Do you want to update the number ?`)){
        const updatedPerson = {
          ...checkPerson,
          number : newNumber
        }
        // console.log(updatedPerson)
        recordService
          .update(checkPerson.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? res : p))
            setMessage(`Update number of ${res.name}`)
            setTimeout(() => setMessage(null), 3000)
            }             
          )
          .catch(err => {
            setMessage(`Information of ${newName} has already been deleted from server`)
            setTimeout(() => setMessage(null), 3000)
          })
      }
      return
    }

    const newPerson = {
      name : newName,
      number : newNumber
    }

    recordService
      .create(newPerson)
      .then(res => {
        setPersons(persons.concat(res))
        setMessage(`Added ${newName}`)
        setNewName('')
        setNumber('')
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(err => {
        console.log(err.response.data.error)
        setMessage(err.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const findName = (e) => {
    if(!e.target.value){
      setSimilarNames([])
      return
    } 
    const results = persons.filter(person => 
      person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSimilarNames(results)
  }

  const remove = (e) => {
    const obj = JSON.parse(e.target.value)
    if(window.confirm(`Delete ${obj.name}`)){
      recordService
        .remove(obj.id)
        .then(res =>{
          recordService.getAll().then(res => setPersons(res))
          setMessage(
            `Deleted ${obj.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }

  }
  return(
    <>
      <Heading type='h1' text='PhoneBook'/>
      <Notification message={message} />
      <Search findName={findName} similarNames={similarNames}/>

      <Heading type='h2' text='Add a New Record'/>
      <AddPerson  
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleNewPerson={handleNewPerson}
        newName={newName}
        newNumber={newNumber}
      />
      
      <Heading type='h2' text='Numbers'/>
      {persons.map(person => 
        <Numbers key={person.id}  person={person} remove={remove}/>
        )}
    </>

  )
}

export default App