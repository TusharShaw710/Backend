import React,{useState} from 'react';
import axios from 'axios';
import "../style/Login.scss";
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();

  const {loading,handleRegister}=useAuth();

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    handleRegister(username,email,password)
    .then((res)=>{
      console.log(res);
      navigate("/")
    })
  }

  return (
    <main>

      <h3>Register</h3>

      <form onSubmit={handleSubmit} >
        <input onInput={(e)=>{setusername(e.target.value)}} type="text" name='username' placeholder='Enter your name' />
        <input onInput={(e)=>{setemail(e.target.value)}} type="text" name='email' placeholder='Enter your email' />
        <input onInput={(e)=>{setpassword(e.target.value)}} type="text" name='password' placeholder='Enter Password'/>
        <button>Register</button>
      </form>

      <p>You have an account ? <Link className='authtoggle' to="/login" >Login</Link></p>
    </main>
  )
}
