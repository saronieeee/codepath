import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import "./App.css";

// Sidebar Component
const Sidebar = () => (
  <div className="sidebar">
    <a href="/" className="sidebar-link">Home</a>
    <a href="/create" className="sidebar-link">Create a Crewmate!</a>
    <a href="/gallery" className="sidebar-link">Crewmate Gallery</a>
  </div>
);

const ROLES = {
  'Developer': {
    speedRange: [30, 100],
    allowedColors: ['Blue', 'Purple', 'Green'],
    description: 'Builds and maintains ship systems'
  },
  'Navigator': {
    speedRange: [50, 120],
    allowedColors: ['Yellow', 'Orange', 'Red'],
    description: 'Charts course through space'
  },
  'Engineer': {
    speedRange: [40, 90],
    allowedColors: ['Red', 'Orange', 'Pink'],
    description: 'Repairs ship components'
  },
  'Captain': {
    speedRange: [60, 150],
    allowedColors: ['Rainbow'],
    description: 'Leads the crew'
  }
};

// Create and Edit Form Component
const CrewmateForm = ({ onSubmit, initialData = { name: '', speed: '', color: 'Red', role: 'Developer' } }) => {
  const [formData, setFormData] = useState(initialData);
  const selectedRole = ROLES[formData.role];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            className="form-input"
            value={formData.role}
            onChange={(e) => {
              const newRole = e.target.value;
              setFormData(prev => ({
                ...prev,
                role: newRole,
                color: ROLES[newRole].allowedColors[0]
              }));
            }}
          >
            {Object.keys(ROLES).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Speed (mph) - Range: {selectedRole.speedRange[0]}-{selectedRole.speedRange[1]}:
          </label>
          <input
            type="number"
            className="form-input"
            value={formData.speed}
            min={selectedRole.speedRange[0]}
            max={selectedRole.speedRange[1]}
            onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Color:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
            {selectedRole.allowedColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`button ${formData.color === color ? 'selected' : ''}`}
                style={{
                  backgroundColor: color.toLowerCase(),
                  color: ['Yellow', 'Rainbow'].includes(color) ? 'black' : 'white'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="button">
          {initialData.id ? 'Update Crewmate' : 'Create Crewmate'}
        </button>
      </form>
    </div>
  );
};

// Crewmate Detail Component
const CrewmateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmates, setCrewmates] = useState(() => {
    const saved = localStorage.getItem('crewmates');
    return saved ? JSON.parse(saved) : [];
  });

  const crewmate = crewmates.find(c => c.id.toString() === id);

  if (!crewmate) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <h1 className="crewmate-title">Crewmate not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="crewmate-details">
          <h1 className="crewmate-title">Crewmate: {crewmate.name}</h1>
          <h2>Stats:</h2>
          <div className="crewmate-stats">
            <div className="stat-item">Role: {crewmate.role}</div>
            <div className="stat-item">Color: {crewmate.color}</div>
            <div className="stat-item">Speed: {crewmate.speed} mph</div>
          </div>
          {crewmate.speed < 5 && (
            <div className="speed-warning">
              You may want to find a Crewmate with more speed, this one is kind of slow 😕
            </div>
          )}
          <div className="edit-link" onClick={() => navigate(`/edit/${crewmate.id}`)}>
            Wanna edit this Crewmate?
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <div className="crewmate-details">
        <h1 className="crewmate-title">Welcome to the Crewmate Creator!</h1>
        <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
      </div>
    </div>
  </div>
);

// Create Component
const Create = () => {
  const navigate = useNavigate();
  const [crewmates, setCrewmates] = useState(() => {
    const saved = localStorage.getItem('crewmates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleCreate = (formData) => {
    const newCrewmate = {
      ...formData,
      id: Date.now()
    };
    const updatedCrewmates = [...crewmates, newCrewmate];
    setCrewmates(updatedCrewmates);
    localStorage.setItem('crewmates', JSON.stringify(updatedCrewmates));
    navigate('/gallery');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="crewmate-title">Create a New Crewmate</h1>
        <CrewmateForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

// Edit Component
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmates, setCrewmates] = useState(() => {
    const saved = localStorage.getItem('crewmates');
    return saved ? JSON.parse(saved) : [];
  });

  const crewmate = crewmates.find(c => c.id.toString() === id);

  const handleUpdate = (formData) => {
    const updatedCrewmates = crewmates.map(c => 
      c.id.toString() === id ? { ...formData, id: c.id } : c
    );
    setCrewmates(updatedCrewmates);
    localStorage.setItem('crewmates', JSON.stringify(updatedCrewmates));
    navigate('/gallery');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="crewmate-title">Edit Crewmate</h1>
        {crewmate ? (
          <CrewmateForm onSubmit={handleUpdate} initialData={crewmate} />
        ) : (
          <div>Crewmate not found</div>
        )}
      </div>
    </div>
  );
};

// Gallery Component
const Gallery = () => {
  const navigate = useNavigate();
  const [crewmates, setCrewmates] = useState(() => {
    const saved = localStorage.getItem('crewmates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleDelete = (id) => {
    const updatedCrewmates = crewmates.filter(c => c.id !== id);
    setCrewmates(updatedCrewmates);
    localStorage.setItem('crewmates', JSON.stringify(updatedCrewmates));
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="crewmate-title">Your Crewmate Gallery!</h1>
        {crewmates.length === 0 ? (
          <div className="crewmate-details">
            <p>You haven't made a crewmate yet!</p>
            <button className="button" onClick={() => navigate('/create')}>
              Create one here!
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {crewmates.map(crewmate => (
              <div key={crewmate.id} className="crewmate-card">
                <h3>{crewmate.name}</h3>
                <div className="stat-item">Role: {crewmate.role}</div>
                <div className="stat-item">Color: {crewmate.color}</div>
                <div className="stat-item">Speed: {crewmate.speed} mph</div>
                <div style={{ marginTop: '15px' }}>
                  <button className="button" onClick={() => navigate(`/crewmate/${crewmate.id}`)}>
                    View Details
                  </button>
                  <button className="button" onClick={() => navigate(`/edit/${crewmate.id}`)}>
                    Edit
                  </button>
                  <button className="button" onClick={() => handleDelete(crewmate.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/crewmate/:id" element={<CrewmateDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;