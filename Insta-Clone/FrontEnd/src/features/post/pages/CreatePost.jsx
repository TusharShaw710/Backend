import React from 'react'
import { useState,useRef } from 'react'
import "../styles/createPost.scss"
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

export const CreatePost = () => {

    const {loading,handleCreatePost}=usePost();
    const navigate=useNavigate();

    const [caption,setCaption]=useState("");
    const postImageFile=useRef(null);

    if(loading){
        return(
            <h2>creating post....</h2>
        )
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const image=postImageFile.current.files[0];
        await handleCreatePost(image,caption);

        navigate("/");
    }
  return (
    <main>
        <div className="create-post">
            <h2>CREATE POST</h2>
            <form onSubmit={handleSubmit}>
                <label className='image' htmlFor="imagefile">SELECT IMAGE</label>
                <input ref={postImageFile} hidden type="file" name='imagefile' id='imagefile'  />
                <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" placeholder='Enter your caption' />
                <button className='postButton'>POST</button>
            </form>
        </div>
    </main>
  )
}
