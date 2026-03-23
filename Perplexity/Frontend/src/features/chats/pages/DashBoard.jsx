import React from 'react'
import useChat from '../hooks/useChat';
import { useEffect } from 'react';


export const DashBoard = () => {
    const initClient=useChat();
    useEffect(()=>{
        initClient();
    }, []);


  return (
    <div>DashBoard</div>
  )
}
