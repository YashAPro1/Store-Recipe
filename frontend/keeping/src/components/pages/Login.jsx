import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import '../css/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';

const baseurl = "http://127.0.0.1:5000";
function Login() {
  
  const [userLogin , setUserLogin] = useState({
    'username':"",
    'password':"",
  });
  const navigate = useNavigate()
  const [l,setL] = useState(null)
  const [msg , setMsg] = useState('');


  const handleChange = (event) => {
   setUserLogin({
    ...userLogin,[event.target.name] : event.target.value,
   }) 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const instructorformData = new FormData();

    instructorformData.append("username",userLogin.username)
    instructorformData.append("password",userLogin.password)
    

    try{

      // axios.post(baseurl+`/login`,instructorformData)
      axios.post(baseurl+`/login`,{
          email: userLogin.username,
          password: userLogin.password
      }
      )
      .then((res)=>{
        
        if(res.data.bool === true){
          setL(true)
          setMsg(res.data.message);
          localStorage.setItem('instructorLoggedIn',true);
          console.log(localStorage.getItem("instructorLoggedIn"));
          localStorage.setItem('userid',res.data.user);
          console.log(localStorage.getItem("userid"));
          localStorage.setItem('username',res.data.Username);
          // localStorage.setItem('username',"Yash")
          navigate('/main')
        }
        else{
          setL(false)
          setMsg(res.data.msg)
        }
      });
    }
    catch(err){
      console.log("Something went wrong");
    }
    
  };
  useEffect(()=>{
    document.title = "Login";
   
    },[]);


  

  return (
    <>  



    <div className="container1">
      
      <h2 style={{marginTop:'1rem'}}> Login</h2>  
      <div className='form'>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            value={userLogin.username}
            name = 'username'
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name = 'password'
            value={userLogin.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
        <div style={{color:'red',margin:'auto'}}>

            {l === false?<><p >{msg}</p></>:<></>}
            <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </div>

    </>
  );
}

export default Login;
