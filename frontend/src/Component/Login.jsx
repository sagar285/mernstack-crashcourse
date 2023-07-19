import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Usercontext'


const Login = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const navigate =useNavigate();
   const {toke,settoken}=useAuth();

    const submit =async(e)=>{
        e.preventDefault();
        const res= await axios.post("http://localhost:5000/login",{email,password});
       
        if(res.status===200){
            localStorage.setItem("usertoken",res.data.token);
            settoken(res.data.token);
           navigate("/");
        }
        else{
            alert("something went wrong");
        }
    }






  return (
    <div className='w-[100%]'>
    <form className='flex flex-col' onSubmit={submit}>
      <input type="email" placeholder='enter email'
      onChange={(e)=>setemail(e.target.value)}
             className='m-1 w-[80%] font-semibold ml-[6rem] bg-gray-200 rounded-sm p-2 border-none'
      />
      <input type="password" placeholder='enter password'
      onChange={(e)=>setpassword(e.target.value)}
             className='m-1 w-[80%] font-semibold ml-[6rem] bg-gray-200 rounded-sm p-2 border-none'
      />
      <button
      className='bg-white text-black w-[12rem] font-bold text-lg rounded-md lg:ml-[28rem] mt-6 p-2'
      >Login</button>
    </form>
 </div>
  )
}

export default Login