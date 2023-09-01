import { useState } from 'react'
import './App.css'
import { TimerDiv } from './components/timer-div'
function App() {
  const [count, setCount] = useState(0)

  return (
  <TimerDiv/>
  )
}

export default App
