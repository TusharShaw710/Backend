import React from 'react'
import { Link } from 'react-router-dom'
import { DynamicForm } from '../components/form'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const loginFields = [
  {
    name: 'email',
    label: 'Identity Tag',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Security Key',
    type: 'password',
    placeholder: '••••••••',
    required: true,
  },
]

export const Login = () => {
  const navigate=useNavigate();
  const {handleLogin}=useAuth();
  const user=useSelector((state)=>state.auth.user);
  const loading=useSelector((state)=>state.auth.loading);
  const handleLoginSubmit = async(formData) => {
    console.log('Login submit:', formData);
    const isSuccess=await handleLogin(formData);
    if(isSuccess){
      navigate("/");
    }
  }

  if(loading){
    return <div>Loading...</div>;
  }

  if(!loading && user){
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
         style={{
           background: 'radial-gradient(circle at center, rgba(0, 255, 194, 0.05) 0%, rgba(10, 10, 12, 0) 70%), #0a0a0c'
         }}>
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
             style={{ background: '#00FFC2' }}></div>
      </div>

      {/* Form Component */}
      <DynamicForm
        fields={loginFields}
        onSubmit={handleLoginSubmit}
        buttonText="Authenticate"
        heading={
          <>
            <span style={{color:"#FFFFFF"}}>Access</span> <span style={{ color: '#00FFC2' }}>System</span>
          </>
        }
        subtitle="Initialize your secure encrypted session."
        toggleLink={{
          text: "New to the pulse?",
          linkComponent: (
            <Link 
              to="/register" 
              className="transition duration-300 font-semibold hover:opacity-80"
              style={{ color: '#00FFC2' }}
            >
              Join the Network
            </Link>
          ),
        }}
      />
    </div>
  )
}
