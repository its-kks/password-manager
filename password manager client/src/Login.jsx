import { useState } from 'react'
import {Input} from './Input'
import {Button} from './Button'
import { Link, useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import './Login.css'

export function Login(){
    const [email,setMail] = useState("");
    const [password,setPass] = useState("");
    const navigate = useNavigate();
    const server = import.meta.env.VITE_SERVER;

    let accessToken;

    //handling cookies
    function setCookie(name, value, minutesToExpire) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        if (minutesToExpire) {
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (minutesToExpire * 60 * 1000));
          cookieString += `; expires=${expirationDate.toUTCString()}`;
        }
        document.cookie = cookieString;
    }

    //handling login
    async function handleLogin(){
        if(email!=='' && password!==''){
            if(!EmailValidator.validate(email)){
                alert("Invalid Email");
                return;
            }
            let userData = {
                email: email,
                password: password
            }
            let responseData;
            try {
                // Send the POST request using fetch
                const response = await fetch(server+"api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                
                // Parse the response data as JSON
                responseData = await response.json();
                
                console.log(response.ok);
                
                if (!response.ok) {
                    throw new Error("Error: " + response.status);
                }
                else{
                    accessToken = responseData.accessToken;
                    const username = email.split('@')[0];
                    setCookie('accessToken',accessToken,15);
                    setCookie('userName',username,60);
                    navigate('/passwords')
                }
            } catch (error) {
                // Request failed or an error occurred
                if(responseData==undefined){
                    alert("Failed to reach server");
                }
                else{
                    alert(responseData.message);
                }
                console.error("Login failed: ", error.message);
            }
        }
        else{
            alert("All Fields are mandatory");
        }
    }
    function handleSignup(){
        navigate('/signup');
    }
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
                        <Button name={"Login"} className={"loginButton button"} onClick={handleLogin}/>
                        <Button name={"Signup"} className={"signupButton button"} onClick={handleSignup}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}