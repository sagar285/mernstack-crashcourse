import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Usercontext";

const Navbar = () => {
  const { token, settoken } = useAuth();


  const logout =()=>{
    settoken('');
    localStorage.removeItem("usertoken");
  }



  return (
    <div className="text-white">
      <ul className="flex  justify-end mr-10 p-2">
        {token ? (
          <Link to={"/login"} className="m-4 font-bold hover:text-blue-200">
            <li onClick={logout}>Logout</li>
          </Link>
        ) : (
          <>
            <Link
              to={"/register"}
              className="m-4 font-bold hover:text-blue-200"
            >
              <li>Register</li>
            </Link>
            <Link to={"/login"} className="m-4 font-bold hover:text-blue-200">
              <li>Login</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
