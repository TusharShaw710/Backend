import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/api/post",
    withCredentials:true
});

export async function getFeed() {
    try{
        const  response=await api.get("/getFeed");
        return response;
    }catch(err){
        throw err
    }
}