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

export async function createPost(imagefile,caption) {
    try {

        const formdata=new FormData();

        formdata.append("image",imagefile);
        formdata.append("caption",caption);

        const response=await api.post("/",formdata);
        return response;
        
    } catch (err) {
        console.log(err);
    }
    
}