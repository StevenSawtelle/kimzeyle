import React, { useState } from "react";

import './App.css';
import { getRandomCousin } from "./helpers/cousinMapping";
import { EmptyResults, ResultText } from "./ResultText";
import CousinSelection from './CousinSelection';
import { cousins } from './helpers/cousinMapping';
import FuzzySet from "fuzzyset.js";
const fs = FuzzySet(cousins)

let cousin = getRandomCousin();

const App = () => {
  const [mainText, setMainText] = useState("Guess the Kimzey cousin, wordle style!");
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const onGuess = guess => () => {
    setMainText("Guess the Kimzey cousin, wordle style!");
    if(cousins.map(cousin => cousin.toUpperCase()).includes(guess.toUpperCase())){
      setGuesses(guesses.concat(guess))
      if(guess.toUpperCase() === cousin.toUpperCase()){
        setMainText(`Correct! It is ${cousin}.`);
        setGameOver(true);
      }
      else if(guesses.length >= 5){
        setMainText(`Game over. It is ${cousin}!`);
        setGameOver(true);
      }
    } else {
      const maybeGuess = fs.get(guess);
      if(maybeGuess){
        setMainText(`Invalid cousin spelling. Did you mean "${maybeGuess[0][1]}"?`);
      }else{
        setMainText(`Invalid cousin spelling.`);
      }
    }
  }

  const playAgain = () => {
    cousin = getRandomCousin();
    setMainText("Guess the Kimzey cousin, wordle style!");
    setGameOver(false);
    setGuesses([]);
  }

  return (
    <div className="App">
      {/* how many in a row */}
      <header className="App-header">
        <h1 className={'kimzeyle'}>Kimzeyle</h1>
        {/* <ImageContainer politician={politician} /> */}
        <p>
          {mainText}
        </p>
        {!gameOver && <CousinSelection onGuess={onGuess} />}
        {gameOver && 
          <button onClick={playAgain}>
              Start over
          </button>}
        <div className={'results'}>
          {guesses.map((guess, i) => {
            return <ResultText key={i} guess={guess.toUpperCase()} cousin={cousin.toUpperCase()} />
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
