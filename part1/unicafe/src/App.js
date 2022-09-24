import { useState } from "react"

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <>
    <td>
      <p>{text} :</p>
    </td>
    <td>
      <p>{value}</p>
    </td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good+neutral+bad === 0){
    return(
      <p><b>No feedback given</b></p>
    )
  } else {
    return(
      <>
      <table>
        <tr>
          <StatisticsLine text='Good' value={good}/>
        </tr>
        <tr>
          <StatisticsLine text='Neutral' value={neutral}/>
        </tr>
        <tr>
          <StatisticsLine text='Bad' value={bad}/>          
        </tr>
        <br/>
        <tr>        
          <StatisticsLine text='Total' value={good + neutral + bad}/>
        </tr>
        <tr>
          <StatisticsLine text='Average' value={(good + (bad * -1))/3}/>
        </tr>
        <tr>
          <StatisticsLine text='Positive' value={(good/(good + neutral + bad))*100 + "%"}/>
        </tr>
      </table>
      </>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return(
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='good' />
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral' />
      <Button handleClick={() => setBad(bad+1)} text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App