import './App.css';
import Calendar from './components/Calendar'

const App = () => {

  return (
    <div className="App">
      <h1>Resident Assistant Meetings</h1>
      <h2>A tool for RAs scheduling meetings and 1-on-1s with residents</h2>
      <Calendar />
    </div>
  )
}

export default App