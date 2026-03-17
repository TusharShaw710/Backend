import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';

export function Protected({children}){

    const {user,loading}=useAuth();

    if(loading){
        return <div>Loading...</div>;
    }

    if(!user){
        return <Navigate to={"/login"}/>
    }

    return children;

}
