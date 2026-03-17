import { createContext,useState } from "react";

export const AuthContext=createContext();

export function AuthProvider({children}){
    const [user,setuser]=useState("");
    const [loading,setLoading]=useState(true);

    return(
        <AuthContext.Provider  value={{user,loading,setuser,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}


