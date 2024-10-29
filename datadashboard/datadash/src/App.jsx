// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BreweryDashboard from './components/ui/BreweryDashboard';
import BreweryDetail from './components/ui/BreweryDetail';
import "./styles/globals.css";
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BreweryDashboard />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
      </Routes>
    </Router>
  );
};

export default App;