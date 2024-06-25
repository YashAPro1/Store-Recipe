import Navbar from './components/Navbar';
import './App.css';
import React from 'react'

import Footer from './components/Footer';

import {BrowserRouter, Route,Routes} from "react-router-dom";
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import Signup from './components/pages/Signup';



function App() {
  

  return (
    
    <BrowserRouter>
    <div>
      <Navbar/>
      <div className='fullbg'>
        <Routes>
          <Route path='/main' element={<Main/>}/>
          <Route path="/" element={<Login />}/>
          <Route path="/SignUp" element={<Signup />}/>
        </Routes>
         
      </div>
      
      <Footer />
    </div>
    </BrowserRouter>
    
  );
  
}

export default App;
