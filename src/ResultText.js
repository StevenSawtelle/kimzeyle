import React from "react";

import './styles/letters.scss';

const getHitList = (guess, goal) => {
    //first init array of incorrect guesses
    let hitList = Array.apply(null, Array(guess.length)).map(() => 'incorrect' )
    let usedLetters = {};
    //first pass for correct letters
    for(let i = 0; i < guess.length; i+=1){
        if(i >= goal.length){
            break;
        }
        if(goal[i] === guess[i]){
            hitList[i] = 'correct';
            if(usedLetters[goal[i]]){
                usedLetters[goal[i]] += 1;
            }
            else {
                usedLetters[goal[i]] = 1;
            }
        }
    }
    //then pass for misplaced letters
    const goalCharArray = goal.split('');
    for(let i=0; i < guess.length; i+=1){
        if(hitList[i]==='correct'){
            continue;
        }
        let cur = guess[i];
        if(goalCharArray.includes(cur)){
            //possible misplace, but need to see if letter already used
            const countOfCurInGoal = goal.split(cur).length - 1;
            const alreadyUsedCurCount = usedLetters[cur] || 0;
            if(countOfCurInGoal > alreadyUsedCurCount){
                //misplaced
                hitList[i] = 'misplaced';
                if(usedLetters[cur]){
                    usedLetters[cur] += 1;
                }
                else {
                    usedLetters[cur] = 1;
                }
            }
        }
    }
    return hitList;
}

const WordleLetter = ({ status, letter }) => {
    return <div className={'wordle-letter'}>
        <p className={`tile ${status}`}>
            {letter}
        </p>
    </div>;
}

export const EmptyResults = () => {
    return <div className='result-text'>
        {['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'].map((num, i) => {
            return <WordleLetter key={i}
                status={`incorrect ${num}`}
            />
        })}
    </div>
}

export const ResultText = ({guess, cousin }) => {
    const hitList = getHitList(guess, cousin);//eg ['correct', 'incorrect', 'incorrect', 'misplaced']
    return <div className='result-text'>
        {guess.split('').map((letter, i) => {
            return <WordleLetter key={i}
                status={hitList[i]}
                letter={letter.toUpperCase()}
            />
        })}
    </div>
}
