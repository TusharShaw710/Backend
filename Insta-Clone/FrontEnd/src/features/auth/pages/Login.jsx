import React,{useState} from 'react'
import "../style/Login.scss"
import axios from "axios"
import { Link } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();

  const {handleLogin,loading}=useAuth();

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    handleLogin(username,password)
    .then((res)=>{
      console.log(res);
      navigate("/");
    });
  }
  return (
    <main>
      <h2>LOGIN</h2>

      <form onSubmit={handleSubmit}>
        <input onInput={(e)=>{setusername(e.target.value)}} type="text" name='username' placeholder='Enter your name' />
        <input onInput={(e)=>{setpassword(e.target.value)}} type="text" name='password' placeholder='Enter Password'/>
        <button>Login</button>
      </form>
      <p>You haven't register? <Link className='authtoggle' to="/register" >Register</Link></p>
    </main>
  )
}
