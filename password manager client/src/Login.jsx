import { useState } from 'react'
import {Input} from './Input'
import {Button} from './Button'
import './Login.css' 
export function Login(){
    const [email,setMail] = useState("");
    const [password,setPass] = useState("");
    const [login,setLogin] = useState(false);
    const [signup,setSignup] = useState(false);
    return (
    <>
        <div className='flexbox'>
            <div style={{width:"35%"}}>
                <img src={'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'} 
                    alt={"Encrytion image"}
                    height={`${window.innerHeight}px`}
                />
            </div>
            <div className='flexbox' style={{width:"65%"}}>
                <div style={{
                    borderRadius: "5px",
                    width: "30%",
                    boxShadow: "0px 0px 5px 1px rgb(75, 75, 75)"
                    }}>
                    <div className='flexbox' style={{flexDirection:"column", marginTop:"40px"}}>
                        <Input name={"email"} 
                                id={"email"}  
                                placeholder={"Registered Email"}
                                value={email}
                                upDate={setMail}
                                type={"text"}
                                />
                        <Input name={"password"} 
                                id={"password"}  
                                placeholder={"Password"}
                                value={password}
                                upDate={setPass}
                                type={"password"}
                        />
                    </div>
                    <div className='flexbox' style={{margin:"10px 0px 40px 0px"}}>
                        <Button name={"Login"} className={"loginButton button"} onClick={setLogin}/>
                        <Button name={"Signup"} className={"signupButton button"} onClick={setSignup}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}