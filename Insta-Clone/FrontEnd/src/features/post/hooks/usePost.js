import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";

export function usePost(){
    const context=useContext(PostContext);
    const {post,loading,setpost,setloading}=context;

    const handleGetFeed=async()=>{
        setloading(true);
        try{
            const response=await getFeed();
            console.log(response);
            setpost(response.data.posts); // assuming response has data.posts
            return response;

        }catch(err){
            console.log(err);
        }finally{
            setloading(false);
        }

    }

    return(
            {post,loading,handleGetFeed}
    )
}