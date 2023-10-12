import { useState } from "react"
import { FaPlusCircle } from "react-icons/fa";
import './Login.css'

export function Input({name,id,placeholder,value,upDate,type}){
    function updateVal(event){
        upDate(event.target.value);
    }
    return (
            <input type={type}
                className="input"
                name={name} 
                id={id} 
                placeholder={placeholder} 
                value={value}
                onChange={updateVal}
            />
    )
}