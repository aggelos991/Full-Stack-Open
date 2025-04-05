import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text='good' total={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='neutral' total={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad' total={props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='all' total={props.all} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='average' total={props.average.toFixed(2)} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive' total={`${props.positive.toFixed(2)} %`} /></td>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine  = (props) => {
  return (
      <p>{props.text} {props.total}</p>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(1)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good - bad) / all)
    setPositive(((good) / (all)) * 100)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / all)
    setPositive(((good) / (all)) * 100)

  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - bad) / all)
    setPositive(((good) / (all)) * 100)

  }

  return (
    <div>
      <Header text ="give feedback"/>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      <Header text ="statistics"/>
      <Statistics all={all} good={good} neutral={neutral} 
      bad={bad} average={average} positive={positive}/>
    </div>
  )
}
export default App