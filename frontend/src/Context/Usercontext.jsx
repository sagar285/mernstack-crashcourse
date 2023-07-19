import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

   const Authcontext = createContext();
const Usercontext = ({children}) => {

    const [token,settoken]=useState('')

axios.defaults.headers.common["Authorization"]=token;
useEffect(()=>{
  const usertoken = localStorage.getItem("usertoken");
  if(usertoken){
    settoken(usertoken);
  }
},[])



  return (
    <Authcontext.Provider value={{token,settoken}}>
        {children}
    </Authcontext.Provider>
  )
}

const useAuth =()=>useContext(Authcontext);
export {useAuth,Usercontext};