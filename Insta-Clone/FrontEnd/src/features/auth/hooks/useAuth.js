import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,getme } from "../services/auth.api";

export function useAuth(){

    const context=useContext(AuthContext);
    const {user,loading, setloading , setuser }=context;


    const handleLogin=async (username,password)=>{
        setloading(true);

        try {
            const response=await login(username,password)
            .then((res)=>{
                console.log(res);
                setuser(res.data.user);
            })

        } catch (err) {
            console.log(err);
        }finally{
            setloading(false);
        }
    }

    const handleRegister=async (username,email,password)=>{
        setloading(true);

        try{
           const response=await register(username,email,password)
           .then((res)=>{
                console.log(res);
                setuser(res.data.user);
           });

        }catch(err){
            console.log(err);
        }finally{
            setloading(false);
        }
    }

    return(
        {user,loading,handleLogin,handleRegister}
    );    
}