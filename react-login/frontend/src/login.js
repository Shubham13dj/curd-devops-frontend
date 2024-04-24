import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      'email': email,
      'password': password

    }; 
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Login sucessful!');
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.detail);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };
  return (
    <div className={'mainContainer'}>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='password'
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="submit" value={'Log in'} />
      </div>
      <div> <h4>New User?{"  "} <a href='./regitration'>   Register Here...</a></h4>
    </div>
    </form>
    </div>


  )
}

export default Login