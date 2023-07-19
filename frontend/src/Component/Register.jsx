import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const navigate =useNavigate();


    const submit =async(e)=>{
        e.preventDefault();
        const res= await axios.post("http://localhost:5000/register",{name,email,password});
        if(res.status===200){
           navigate("/login");
        }
        else{
            alert("something went wrong");
        }
    }





  return (
    <div className='w-[100%]'>
       <form className='flex flex-col' onSubmit={submit}>
         <input type="text" placeholder='enter name' 
         onChange={(e)=>setname(e.target.value)}
          className='m-1 w-[80%] font-semibold ml-[6rem] bg-gray-200 rounded-sm p-2 border-none'
         />
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
         >Register</button>
       </form>
    </div>
  )
}

export default Register