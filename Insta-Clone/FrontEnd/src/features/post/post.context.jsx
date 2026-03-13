import { createContext,useState } from "react";
import { getFeed } from "./services/post.api";

export const PostContext=createContext();

export function PostProvider({children}){

    const [post,setpost]=useState(null);
    const [loading,setloading]=useState(false);

    return (
        <PostContext.Provider value={{post,loading,setpost,setloading}}>
            {children}
        </PostContext.Provider>
    );
}