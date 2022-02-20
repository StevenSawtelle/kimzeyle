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
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [avgGuesses, setAvgGuesses] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([]);

  const onGuess = guess => {
    const oldGuesses = guesses;
    const newGuesses = oldGuesses.concat(guess)
    setMainText("Guess the Kimzey cousin, wordle style!");
    if(cousins.map(cousin => cousin.toUpperCase()).includes(guess.toUpperCase())){
      setGuesses(newGuesses)
      if(guess.toUpperCase() === cousin.toUpperCase()){
        setMainText(`Correct! It is ${cousin}.`);
        // this code is ugly but its purpose is to not need to process state. could be a lot cleaner
        const oldCorrect = correct;
        const newCorrect = oldCorrect + 1;
        setAttempted(attempted + 1);
        setCorrect(correct + 1);
        const oldPastGuesses = pastGuesses;
        const newPastGuesses = [...oldPastGuesses, newGuesses];
        setPastGuesses(newPastGuesses);
        const sum = newPastGuesses.reduce((prev, cur) => prev + cur.length, 0);
        setAvgGuesses(parseFloat((sum / newCorrect).toFixed(2)));
        setGameOver(true);
      }
      else if(guesses.length >= 5){
        setMainText(`Game over. It is ${cousin}!`);
        setAttempted(attempted + 1);
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
        <p className={'mainText'}>
          {mainText}
        </p>
        <p className={'score'}>Attempted: {attempted}</p>
        <p className={'score'}>Correct: {correct}</p>
        <p className={'score'}>Average Guesses: {avgGuesses}</p>
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
        <p className={'subtext'}>Happy 80th bday Grandma and Grandpa!</p>
        <p className={'subtext'}>A website by <a href='https://www.stevensawtelle.com'>Steven Sawtelle</a></p>
      </header>
    </div>
  );
}

export default App;
