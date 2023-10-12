import React from 'react';
import './Login.css';
import {BiLogIn} from 'react-icons/bi';
export function Button({onClick,name,className}){
    return (
        <>
            <button className={className+" "+"flexbox"} onClick={onClick}>
                {name}
                {name==="Login"?<BiLogIn style={{marginRight:"5px"}}/>:null}
            </button>
        </>
    )
}