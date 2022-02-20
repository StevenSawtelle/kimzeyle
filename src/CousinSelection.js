import React, {useState} from "react";
import { Dropdown } from 'semantic-ui-react'
// import { cousi } from './helpers/states';
import { cousins } from './helpers/cousinMapping';

const cousinOptions = cousins.map(cousin => {
    return { value: cousin, text: cousin }
})
  
const CousinSelection2 = ({onGuess}) => {
    const [guess, setGuess] = useState("");

    const submit = guess => () => {
        onGuess(guess);
        setGuess("");
    }

    return <div>
            <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
            <button onClick={submit(guess)}>
            Guess
            </button>
        </div>

    };
  
const CousinSelection = ({onGuess}) => {
    const [guess, setGuess] = useState("");
    
    return <div style={{display: "inline-flex"}}>
        <Dropdown
            placeholder='Select Cousin'
            fluid={false}
            search
            selection
            options={cousinOptions}
            onChange={(_, d) => setGuess(d.value)}
        />
        <button onClick={onGuess(guess)}>
            Guess
        </button>
    </div>

    };

export default CousinSelection2;