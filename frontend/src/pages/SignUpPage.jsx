import { useState } from "react";
import axios from 'axios'
export default function SignUpPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [backenderror, setBackendError] = useState(false);
  const [backendmessage, setBackendMessage] = useState("");
  const handleUserName = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setBackendError(false);
    setSubmitted(false);
    if (username === "" || password === ""){
      setError(true);
    }
    else{
      try {
        const res = await axios.post("http://localhost:4000/signup", {username, password});
        console.log(res.status);

        setBackendError(false);
        setSubmitted(true);
        console.log(res.status);
        
      } catch (error) {
        setBackendError(true);
        setBackendMessage(error.response.data.Error);
        setSubmitted(false);
        console.log(error.response.data);
      }
    }
  }

  const successMessage = () => {
    return (
      <div style={{display: submitted ? "" : "none"}}>
        <h1>User {username} registered.</h1>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div style={{display: error ? "" : "none"}}>
        <h1>Please fill out every field before submitting</h1>
      </div>
    )
  }

  const backenderrorMessage = () => {
    return (
      <div style={{display: backenderror ? "" : "none"}}>
        <h1>{backendmessage}</h1>
      </div>
    )
  }



    return (
      <main>
        <h1>Sign Up Page</h1>
        <div>
          {errorMessage()}
          {successMessage()}
          {backenderrorMessage()}
        </div>
        <form>
          <input type="text" name="username" onChange={handleUserName} value={username} placeholder="Username: " />
          <input type="password" name="password" onChange={handlePassword} value={password} placeholder="Password: " />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </main>
    );
  }