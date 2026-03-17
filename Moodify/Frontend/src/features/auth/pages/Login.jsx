import React, { useEffect } from 'react'
import { useState } from 'react'
import "../styles/login.scss"
import { FormGroup } from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

export const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {user,loading,handleLogin}=useAuth();
    const navigate=useNavigate();

    useEffect(() => {
        if (user) {
            console.log("User updated:", user);
        }
    }, [user]);

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        await handleLogin(email,password);
        console.log(user);
        navigate("/");
    
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup setState={setEmail} name="email" placeholder="Enter your email" />
                <FormGroup setState={setPassword} name="password" placeholder="Enter your password" />
                <button className='button' type="submit">Login</button>
            </form>

        </div>
    </main>
  )
}

