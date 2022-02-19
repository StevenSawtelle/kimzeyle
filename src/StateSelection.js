import React, {useState} from "react";
import { Dropdown } from 'semantic-ui-react'
// import { cousi } from './helpers/states';
import { cousins } from './helpers/cousinMapping';

const stateOptions = cousins.map(cousin => {
    return { value: cousin, text: cousin }
})
  
const CousinSelection = ({onGuess}) => {
    const [guess, setGuess] = useState("");
    
    return <div style={{display: "inline-flex"}}>
        <Dropdown
            placeholder='Select State'
            fluid={false}
            search
            selection
            options={stateOptions}
            onChange={(_, d) => setGuess(d.value)}
        />
        <button onClick={onGuess(guess)}>
            Guess
        </button>
    </div>

    };

export default CousinSelection;