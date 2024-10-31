import { useState } from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Quotes from "../components/Quotes";
//log in page with JWT verification
export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);
    const [backenderror, setBackendError] = useState(false);
    const [backendmessage, setBackendMessage] = useState("");
    const handleUserName = (e) => {
        setUsername(e.target.value);
      }
    const handlePassword = (e) => {
        setPassword(e.target.value);

      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
    setBackendError(false);
        if (username === "" || password === ""){
            setError(true);
          }
          else{
            try {
              const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {username, password});
              console.log(res.status);
                const {token} = res.data;
                localStorage.setItem('token', token); //local storage
                console.log('Login Successful, Token: ' + token);
                navigate(`/users/${username}`);
            } catch (error) {
              setBackendError(true);
              setBackendMessage(error.response.data.error);
              console.log(error.response.data.error);
            }
          }
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
        <h1>Login Page</h1>
        <div>
          {errorMessage()}
          {backenderrorMessage()}
          <form>
          <input type="text" name="username" onChange={handleUserName} value={username} placeholder="Username: " />
          <input type="password" name="password" onChange={handlePassword} value={password} placeholder="Password: " />
          <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        <Quotes />
      </main>
    );
  }