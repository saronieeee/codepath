import React, { useState } from 'react';
import './App.css';

const cardData = [
  { question: 'Who is the main protagonist?', answer: 'Link', category: 'Characters' },
  { question: 'What is the name of the princess?', answer: 'Zelda', category: 'Characters' },
  { question: 'What is the main villain\'s name?', answer: 'Ganon', category: 'Villains' },
  { question: 'What is the name of Link\'s horse?', answer: 'Epona', category: 'Animals' },
  { question: 'What was the reward for collecting all korok seeds in BOTW', answer: 'golden poop', category: 'Animals' },
];

const App = () => {
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCurrentCard(cardData[randomIndex]);
    setShowAnswer(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Legend of Zelda Flashcards</h1>
        <p>Test your knowledge of the Legend of Zelda universe!</p>
        <p>Total Cards: {cardData.length}</p>
      </header>
      <main>
        {currentCard ? (
          <div className={`card ${currentCard.category.toLowerCase()}`} onClick={() => setShowAnswer(!showAnswer)}>
            <p>{showAnswer ? currentCard.answer : currentCard.question}</p>
          </div>
        ) : (
          <p>Click "Next" to start!</p>
        )}
        <button onClick={getRandomCard}>Next</button>
      </main>
    </div>
  );
};

export default App;
