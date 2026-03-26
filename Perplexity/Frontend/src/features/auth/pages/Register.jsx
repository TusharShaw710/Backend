import React from 'react'
import { Link } from 'react-router-dom'
import { DynamicForm } from '../components/form'
import {useAuth} from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const registerFields = [
  {
    name: 'username',
    label: 'Alias',
    type: 'text',
    placeholder: 'username_alpha',
    required: true,
  },
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

export const Register = () => {
  const { handleRegister } = useAuth();
  const navigate=useNavigate();
  const handleRegisterSubmit = async (formData) => {
    const isSuccess=await handleRegister(formData);
    if(isSuccess){
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, rgba(255, 0, 229, 0.08) 0%, rgba(13, 13, 18, 0) 50%), #0D0D12'
         }}>
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
             style={{ background: '#00FFC2' }}></div>
      </div>

      {/* Form Component */}
      <DynamicForm
        fields={registerFields}
        onSubmit={handleRegisterSubmit}
        buttonText="Initialize"
        heading={
          <>
           <span style={{color:"#FFFFFF"}}>ESTABLISH</span> <span style={{ color: '#00FFC2' }}>Node</span>
          </>
        }
        subtitle="Create your secure credentials."
        toggleLink={{
          text: "Already on the grid?",
          linkComponent: (
            <Link 
              to="/login" 
              className="transition duration-300 font-semibold hover:opacity-80"
              style={{ color: '#FF00E5' }}
            >
              Access System
            </Link>
          ),
        }}
      />
    </div>
  )
}
