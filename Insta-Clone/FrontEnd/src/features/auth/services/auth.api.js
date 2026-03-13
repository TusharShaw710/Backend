import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
});

export async function register(username,email,password) {
    try{
        let response=await api.post("/register",{
            username,
            email,
            password
        });

        return response

    }catch(err){
        throw err
    }
    
}
export async function login(username,password) {
    try{
        let response=await api.post("/login",{
            username,
            password
        });

        return response

    }catch(err){
        throw err
    }   
}

export async function getme(){
    try {
        const response=await api.get("/get-me");
        return response;
        
    } catch (err) {
        throw err
    }
}