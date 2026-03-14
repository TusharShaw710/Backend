import React, { useEffect } from 'react'
import "../styles/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { Nav } from '../styles/components/Nav'

const Feed = () => {
    const { post: posts, loading, handleGetFeed } = usePost();

    useEffect(() => {
        const fetchFeed = async () => {
            await handleGetFeed();
        };
        fetchFeed();
    }, []);

  return (
    <main className='feed-page'>
        <div className="feed">
            <Nav />
            <div className="posts">

                {posts?.map((post)=>{
                    return(
                        <Post key={post._id} user={post.userId} post={post}/>
                    )
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed