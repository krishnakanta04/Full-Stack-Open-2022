import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  const randomNumber = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    return random
  }

  const increaseVote = () => {
    let copyOfVote = [...vote]
    copyOfVote[selected] += 1
    setVote(copyOfVote)
  }
  
  let max = vote.indexOf(Math.max(...vote))

  return (
    <>
    <h1>Anecdote of the Day</h1>

    <p>{anecdotes[selected]}</p>
    <p>Votes on this Anecdote : {vote[selected]}</p>

    <button onClick={increaseVote}>Vote</button>
    <button onClick={() => setSelected(randomNumber())}>Next Anecdote</button>

    <h2>Anecdote with Highest Vote</h2>
    <p>{anecdotes[max]}</p>
    <p>Highest Vote : {vote[max]}</p>
    </>
  )
}

export default App