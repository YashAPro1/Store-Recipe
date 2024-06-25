import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import '../css/Navbar.css';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar';
const baseurl = "http://127.0.0.1:5000";
function Signup() {
  const [userRegister, setUserRegister] = useState({
    
    'username':'',
    'email':'',
    'password':'',
    'confirmpassword':'',
    'status':'',
  });
  
  const handleChange = (event) => {
    setUserRegister({
      ...userRegister,[event.target.name]:event.target.value,
    });
    
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userRegister.password == userRegister.confirmpassword){

      const instructorformData = new FormData;
     
      instructorformData.append("UserName",userRegister.username)
      instructorformData.append("email",userRegister.email)
      instructorformData.append("password",userRegister.password)
      

      // const newninstructor = {
      //   FirstName:userRegister.firstName,
      //   LastName:userRegister.lasttName,
      //   UserName:userRegister.username,
      //   email:userRegister.email,
      //   password:userRegister.password,
      //   Qualification:userRegister.qualification,
      //   mobile_no:userRegister.mobileNo,
      //   skills:userRegister.skills,
      // }
      try{
  
        axios.post("http://127.0.0.1:5000/sign-up",{
          'firstName':userRegister.username,
          'email':userRegister.email,
          'password1':userRegister.password,
          'password2':userRegister.confirmpassword,
        })
        .then((res)=>{
          setUserRegister({
           
            'username':'',
            'email':'',
            'password':'',
            'confirmpassword':'',
            
            'status':'success',
          })

          if (res.data.bool === true){
            Swal.fire({
              title:"SuccessFully Registered",
              imageUrl:'https://img.freepik.com/premium-vector/male-student-feeling-confused-while-looking-up-with-thoughtful-focused-expression-questioned-thinking-curious-with-question-mark-concept-illustration_270158-365.jpg?w=2000',
              imageHeight:'200',
              text:"You Can Login Now",
              confirmButtonColor:'rgb(185,28,28)'
          })
          navigate("/")
        } else {
          Swal.fire({
            title:"Not able to register",
            imageUrl:'https://img.freepik.com/premium-vector/male-student-feeling-confused-while-looking-up-with-thoughtful-focused-expression-questioned-thinking-curious-with-question-mark-concept-illustration_270158-365.jpg?w=2000',
            imageHeight:'200',
            text:"Check your email ID, password and retry",
            confirmButtonColor:'rgb(185,28,28)'
        })
        }

        });
        
      }
     catch(err){
      Swal.fire({
        title:"User not Found",
        imageUrl:'https://img.freepik.com/premium-vector/male-student-feeling-confused-while-looking-up-with-thoughtful-focused-expression-questioned-thinking-curious-with-question-mark-concept-illustration_270158-365.jpg?w=2000',
        imageHeight:'200',
        text:"Check your email ID, password and retry",
        confirmButtonColor:'rgb(185,28,28)'
    })
      }
    }
    else{
      console.log("")
    }
  };

  useEffect(()=>{
    document.title = "SignUp";
    
  },[]);

  return (
    <>  

    <div className="bg">

    <div className="container1">
      <h2>Registration</h2>
      <div className='form'>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name='username'
            value={userRegister.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name='email'
            value={userRegister.email}
            onChange={handleChange}
          />
        </div>
        

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name = 'password'
            value={userRegister.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name = 'confirmpassword'
            value={userRegister.confirmpassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Register</button>
      </div>
    </div>
    </div>
    </>
  );
}

export default Signup;
