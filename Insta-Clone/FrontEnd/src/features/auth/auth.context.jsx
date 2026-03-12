import { createContext , useState , useEffect } from "react";

export const AuthContext=createContext();

export function AuthProvider({children}){

    const [user,setuser]=useState(null);
    const [loading,setloading]=useState(false);

    return(
        <AuthContext.Provider value={{user,loading,setuser,setloading}}> 
            {children}
        </AuthContext.Provider>
    )
}

