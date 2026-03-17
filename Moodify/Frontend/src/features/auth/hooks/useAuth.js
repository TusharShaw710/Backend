import { useContext } from "react";
import { AuthContext } from "../api.context";
import { login,register,getMe } from "../services/auth.api";
import { useEffect } from "react";


export function useAuth() {

    const context=useContext(AuthContext);
    const {user,loading,setLoading,setuser}=context;

    const handleLogin=async (email,password)=>{
        setLoading(true);
        try {
            const response=await login(email,password);
            setuser(response.data.user);
                       
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    const handleRegister=async (username,email,password)=>{
        setLoading(true);
        try {
            const response=await register(username,email,password);
            setuser(response.data.user);
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleGetMe=async()=>{
        setLoading(true);
        const response=await getMe();
        setuser(response.data.user);
        setLoading(false);
    }

    useEffect(()=>{
        handleGetMe();
    },[]);

    return({
        user,loading,handleLogin,handleRegister
    });

    
    
}

