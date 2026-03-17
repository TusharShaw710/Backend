import React,{useState} from 'react'
import "../styles/register.scss"
import { FormGroup } from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

export const Register = () => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {loading,handleRegister}=useAuth();
    const navigate=useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        handleRegister(username,email,password)
        .then((res)=>{
            console.log(res);
            navigate("/");
        })
        
    }

  return (
    <main className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <FormGroup setState={setUsername} name="name" placeholder="Enter your name" />
            <FormGroup setState={setEmail} name="email" placeholder="Enter your email" />
            <FormGroup setState={setPassword} name="password" placeholder="Enter your password" />
            <button className='button' type="submit">Register</button>
        </form>
    </main>
  )
}
