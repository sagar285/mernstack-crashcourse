import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Usercontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const { token, settoken } = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [edit,setedit]=useState(false);
  const navigate =useNavigate();

  const userdetail = async () => {
    const res = await axios.get("http://localhost:5000/profile");
    if (res.status === 200) {
      setname(res.data.name);
      setemail(res.data.email);
    } else {
      alert("something went wrong");
    }
  };


// edit user detail

const submit=async(e)=>{
  e.preventDefault();
  const res=await axios.put("http://localhost:5000/profile/update",{name,email});
  if(res.status===200){
    console.log(res);
    setname(res.data.name);
    setemail(res.data.email);
    setedit(false);
  }
  else{
    alert(res.data.message);
  }
}


// delete user function
const deletefunction =async()=>{
  const res=await axios.delete("http://localhost:5000/profile/delete");
  if(res.status===200){
    settoken('')
    setname('')
    setemail('');
    localStorage.removeItem("usertoken");
    navigate("/login");
  }
}




  useEffect(() => {
    userdetail();
  }, [token]);

  return (
    <div className="text-white flex flex-col items-center">

    {
      edit ? 

       <form className="flex flex-col items-center justify-center rounded-3xl w-[350px] h-[250px] bg-gray-300"
       onSubmit={submit}
       >
          <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e)=>setname(e.target.value)}
          className="m-1 w-[80%] font-semibold ml-[2rem] rounded-sm p-2 border-none bg-gray-900"
          />
          <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          className="m-1 w-[80%] font-semibold ml-[2rem] rounded-sm p-2 border-none bg-gray-900"
          />

        <button className="text-black bg-white w-[12rem] ml-12 p-2 sm:mt-[1.2rem] font-bold text-lg rounded-md">Edit</button>

       </form>
      :<div className="w-[300px] sm:bg-blue-600 lg:bg-gray-600 h-[200px] text-center p-4">
      <h1 className="font-bold mb-4">USER &nbsp; INFORMATION</h1>
      <h1>
        <span className="text-orange-500 font-bold text-lg">Name:</span> &nbsp;
        {name}
      </h1>
      <h1>
        <span className="text-orange-500 font-bold text-lg">Email:</span> &nbsp;
        {email}
      </h1>
      <button 
      onClick={()=>setedit(true)}
      className="bg-white text-black font-bold w-[70px] h-[35px] mt-8 m-3">
        Edit
      </button>
      <button className="bg-white text-black font-bold w-[70px] h-[35px] mt-8 m-3"
      onClick={deletefunction}
      >Delete</button>
      </div>
    }




     
    </div>
  );
};

export default Home;
