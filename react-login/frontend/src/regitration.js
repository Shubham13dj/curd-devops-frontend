import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Regitration = (props) => {
  const [username, setusername]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      'username': username,
      'email': email,
      'password': password
    }; 

    try {
      const response = await fetch('http://localhost:8000/regitration/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Registration successful!');
      } else {
        const errorData = await response.json();
        alert('Registration failed: ' + errorData.detail);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className={'mainContainer'}>

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className={'inputContainer'}>
    <div className={'titleContainer1'}>
        Register
      </div>
    <div className={'inputContainer'}>
    <label htmlFor="username">Enter Name:</label>
     <input
          type={Text}
          placeholder="Enter your name here"
          className={'inputBox1'}
          onChange={(ev) => setusername(ev.target.value)}
          />
       <label>Enter Email:</label>
        <input
          type={Text}
          placeholder="Enter your mail here"
          className={'inputBox1'}
          onChange={(ev) => setEmail(ev.target.value)}

          />
          <label>Enter password:</label>
          <input
          type='password'
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox1'}/>
    <label className="errorLabel">{emailError}</label>
    <input className={'inputButton'} type="submit"  />
    </div>   
    </div>
    </form>
    </div>

  )
}

export default Regitration