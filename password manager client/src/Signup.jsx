import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export function Signup() {
    const [email, setMail] = useState('');
    const [password, setPass] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const navigate = useNavigate();

    function handleSignup() {
        if(password===confirmPassword && password!=='' 
            && confirmPassword!=='' 
            && email!==''){
            setShowOtp(true);
        }
        else if(password==='' || confirmPassword==='' || email===''){
            alert("All Fields are mandatory");
        }
        else if(password!==confirmPassword){
            alert("Passwords do not match");
        }
    }
    function handleBack(){
        navigate('/login')
    }

  return (
    <>
      <div className='flexbox'>
        {/* Imgage part */}
        <div style={{ width: '35%' }}>
          <img
            src={
              'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
            }
            alt={'Encryption image'}
            height={`${window.innerHeight}px`}
          />
        </div>
        {/* Form part */}

        <div className='flexbox' style={{ width: '65%' }}>
          <div
            style={{
                borderRadius: '5px',
                width: '30%',
                boxShadow: '0px 0px 5px 1px rgb(75, 75, 75)',
            }}
            >
              
            {/* Input */}
            <div className='flexbox' style={{ flexDirection: 'column', marginTop: '40px' }}>
              <Input
                name={'email'}
                id={'email'}
                placeholder={'Registered Email'}
                value={email}
                upDate={setMail}
                type={'email'}
              />
              <Input
                name={'password'}
                id={'password'}
                placeholder={'Password'}
                value={password}
                upDate={setPass}
                type={'password'}
              />
              <Input
                name={'confirmPassword'}
                id={'confirmPassword'}
                placeholder={'Confirm Password'}
                value={confirmPassword}
                upDate={setConfirmPass}
                type={'password'}
              />
              {showOtp ? (
                <Input
                  name={'otp'}
                  id={'otp'}
                  placeholder={'Enter OTP'}
                  value={otp}
                  upDate={setOtp}
                  type={'text'}
                />
              ) : null}
            </div>

            {/* Button */}
            <div className='flexbox' style={{ margin: '10px 0px 40px 0px' }}>
                {showOtp ? (
                    <Button name={'Verify'} className={'loginButton button'}/>
                ) : (
                    <>                    
                        <Button name={'SignUp'} className={'loginButton button'} onClick={handleSignup}/>
                        <Button name={'Back'} className={'signupButton button'} onClick={handleBack}/>
                    </>
                )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}