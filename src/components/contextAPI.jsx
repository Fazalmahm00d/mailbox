import { createContext, useState } from "react";

export const MailContext=createContext();

const MailProvider=(props)=>{
    const[isEmail,setIsEmail]=useState(localStorage.getItem('email'))
    const[isAuthenticate,setIsAuthenticate]=useState(localStorage.getItem('token'))

    const globalObject={
        isEmail,
        setIsEmail,
        isAuthenticate,
        setIsAuthenticate
    }
    return(
        <MailContext.Provider value={globalObject}>
            {props.children}
        </MailContext.Provider>
    )
}

export default MailProvider