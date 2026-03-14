import React from 'react'
import "../components/Nav.scss"
import { useNavigate } from 'react-router'

export const Nav = () => {
    const navigate=useNavigate();
    return (
        <div className='nav-bar'>
            <p>NavBar</p>
            <button onClick={()=>{
                navigate("/create-post");
            }}>Create Post</button>
        </div>
    )
}
