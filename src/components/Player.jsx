import { useState } from "react";

export default function Player({initialname,symbol,isActive,onChangeName}){ 
    const [edit,setedit] = useState(false);
    const [name, setname] = useState(initialname)
    function handleClick(){
        setedit(edit =>!edit);
        if(edit){
            onChangeName(symbol,name)
        }
    }
    function handleChange(event){
        console.log(event)
        setname(event.target.value)  
    }
    
    let content =   <span className="player-name">{name}</span>;
    let buttonValue = "Edit"
    if(edit){
        content = <input type='text' required value={name} onChange={handleChange}/>
        buttonValue="Save"
    }
    return(
        <li className={isActive? 'active' :undefined}>
            <span className="player" >
            {content}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{buttonValue}</button>
          </li>
    );
}