import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";
import { createPost } from "../services/post.api";
export function usePost(){
    const context=useContext(PostContext);
    const {post,loading,setpost,setloading}=context;

    const handleGetFeed=async()=>{
        setloading(true);
        try{
            const response=await getFeed();
            console.log(response);
            setpost(response.data.posts); // assuming response has data.posts

        }catch(err){
            console.log(err);
        }finally{
            setloading(false);
        }

    }

    const handleCreatePost=async (image,caption)=>{
        setloading(true);
        try {
            const response=await createPost(image,caption);
            // await handleGetFeed();          
        } catch (err) {
            console.log(err);
        }finally{
            setloading(false);
        }

    }


    return(
            {post,loading,handleGetFeed,handleCreatePost}
    )
}