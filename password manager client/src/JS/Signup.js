import * as EmailValidator from 'email-validator';

export function handleLogin(navigate) {
    navigate('/login');
  }

export async function handleSignup(email, password, confirmPassword, setShowOtp, server) {
  if (password === confirmPassword && password !== '' && confirmPassword !== '' && email !== '') {
    if (!EmailValidator.validate(email)) {
      alert("Incorrect email");
    } else {
      // handle otp
      const response = await fetch(server + "api/users/otp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      });
      if (response.ok) {
        setShowOtp(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
      // setShowOtp(true);
    }
  } else if (password === '' || confirmPassword === '' || email === '') {
    alert("All Fields are mandatory");
    console.log(email, password, confirmPassword);
  } else if (password !== confirmPassword) {
    alert("Passwords do not match");
  }
}

export async function handleVerify(otp, email, password, navigate, server) {
  if (otp !== '') {
    const response = await fetch(server + "api/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        otp
      })
    });
    if (response.ok) {
      navigate("/login");
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  } else {
    alert("Enter OTP");
  }
}

export function handleBack(setOtp,setPass,setMail,setShowOtp,setConfirmPass) {
    setShowOtp(false);
    setPass('');
    setMail('');
    setConfirmPass('');
    setOtp('');
}