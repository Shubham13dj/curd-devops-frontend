import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="login-container">
    <div className="App">
        <h2 class="login-h">Login</h2>
        <form id="loginForm">
            <img src="user.jpeg" alt="User Image"></img>
            <label class="username" for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Pleas Enter Username" required=""></input>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Pleas Enter Password" required=""/><br/>
            <button class="logbutton" type="button" onclick="validateLogin()">Login</button>
        </form>
        <p id="errorMessage" class="error-message"></p>
        </div>
    </div>
  )
}

export default App
