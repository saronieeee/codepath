import React, { useState } from 'react';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [artwork, setArtwork] = useState(null);
    const [prevArtworks, setPrevArtworks] = useState([]);

    const fetchArtwork = async () => {
        const response = await fetch(`https://api.harvardartmuseums.org/object?apikey=${ACCESS_KEY}&size=1&sort=random`);
        const json = await response.json();

        if (json.records && json.records.length > 0) {
            const newArtwork = json.records[0];
            setArtwork(newArtwork);
            setPrevArtworks((artworks) => [...artworks, newArtwork]);
        } else {
            alert("Failed to fetch artwork. Please try again.");
        }
    };

    return (
        <div className="whole-page">
            <h1>Discover Artworks</h1>
            <button onClick={fetchArtwork} className="button">
                Discover Another Artwork
            </button>
            {artwork && (
                <div className="artwork-container">
                    <h2>{artwork.title || 'Untitled'}</h2>
                    <p>Artist: {artwork.people ? artwork.people.map(person => person.name).join(', ') : 'Unknown'}</p>
                    {artwork.primaryimageurl && (
                        <img className="artwork-image" src={artwork.primaryimageurl} alt={artwork.title} />
                    )}
                    <p>{artwork.description || 'No description available.'}</p>
                </div>
            )}
            <div className="container">
                <h3>Previous Artworks</h3>
                <div className="image-container">
                    {prevArtworks.map((art, index) => (
                        <img
                            key={index}
                            className="gallery-screenshot"
                            src={art.primaryimageurl}
                            alt={art.title}
                            title={art.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
