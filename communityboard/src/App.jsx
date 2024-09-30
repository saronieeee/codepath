import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/cards'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Best Places in Santa Cruz</h1>
      <h2>A guide to having the best Santa Cruz experience.</h2>
      <Cards />
    </div>
  )
}

export default App
