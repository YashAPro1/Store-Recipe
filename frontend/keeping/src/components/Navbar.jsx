import React from 'react'
import './css/Navbar.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Navbar() {
  const navigate = useNavigate();
  const logout = () =>{
    axios.post("http://127.0.0.1:5000/logout",{})
  .then((res)=>{
    
    if(res.data.bool === true){
      localStorage.setItem('instructorLoggedIn',false);
    
      localStorage.setItem('userid',"")
      localStorage.setItem('username',"")
      navigate("/");
    }
  });
    
}
  const [user,setuser] = useState(localStorage.getItem("username"))
  return (
    <div>
    <div className='nav'>
      <div className="head">

      <h1 className='headerr' style={{marginLeft:"1rem"}}>Make Your own Recipes</h1>
      </div>
      <div className="log">
      
      {
        localStorage.getItem("username") === ""?
        <></>:
        <><button onClick={logout}>Logout</button></>

      }
      
      
      </div>
    </div>
    </div>
  );
}

export default Navbar;