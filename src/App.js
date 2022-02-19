import React, { useState } from "react";

import './App.css';
import { getRandomCousin } from "./helpers/cousinMapping";
import { statesMapping } from "./helpers/states";
import ImageContainer from './ImageContainer';
import { EmptyResults, ResultText } from "./ResultText";
import StateSelection from './StateSelection';

// let politician = getRandomPolitician();
let cousin = getRandomCousin();

const App = () => {
  const [mainText, setMainText] = useState("Guess the Kimzey cousin!");
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const onGuess = guess => () => {
    // const realGuess = statesMapping[guess].toUpperCase();
    setGuesses(guesses.concat(guess))
    if(guess === cousin){
      setMainText(`Correct! It is ${cousin}.`);
      setGameOver(true);
    }
    else if(guesses.length >= 5){
      setMainText(`Game over. It is ${cousin}!`);
      setGameOver(true);
    }
  }

  const playAgain = () => {
    cousin = getRandomCousin();
    setMainText("Guess the Kimzey cousin!");
    setGameOver(false);
    setGuesses([]);
  }

  return (
    <div className="App">
      {/* how many in a row */}
      <header className="App-header">
        <h1 className={'kimzeydle'}>Kimzeydle</h1>
        {/* <ImageContainer politician={politician} /> */}
        <p>
          {mainText}
        </p>
        {!gameOver && <StateSelection onGuess={onGuess} />}
        {gameOver && 
          <button onClick={playAgain}>
              Start over
          </button>}
        <div className={'results'}>
          {guesses.map((guess, i) => {
            return <ResultText key={i} guess={guess} cousin={cousin} />
          })}
          {!gameOver && [0,1,2,3,4,5].map(i => {
            return guesses.length <= i ? <EmptyResults key={i} /> : null
          })}
        </div>
        <p className={'subtext'}>Love you Grandma and Grandpa!</p>
        <p className={'subtext'}>A website by <a href='https://www.stevensawtelle.com'>Steven Sawtelle</a></p>
      </header>
    </div>
  );
}

export default App;
