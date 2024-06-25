import React, { useState, useEffect } from 'react'

import '../../App.css';
import Card from '../Card';

import CreateArea from '../CreateArea';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Main() {
    const [notes, setNotes] = useState([]);
    const revnotes = [...notes].reverse();
    const [homeloggedin,setHomeloggedin] = useState(true);
    const [userid,setuserid] = useState(localStorage.getItem('userid'));
    const [log,setlog] = useState(localStorage.getItem('username'));
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setfilteredNotes] = useState([]);
    

    async function getallNotes() {
        try{
        const response  = await axios.get(`http://127.0.0.1:5000/getrecipe?user_id=${userid}`)
        const data = response.data.recipes
        setNotes(data)
        
        }catch(error){
        console.log(error)
        }
    }



    async function addNote(newNote) {
        
    try{
        await axios.post("http://127.0.0.1:5000/allrecipe",newNote)
        getallNotes()
        
        }catch(error){
        console.log(error)
        }
    }

    async function deleteNote(id){
        try{
        await axios.delete(`http://127.0.0.1:5000/delete-recipe?id=${id}`)
        getallNotes()
        
        }catch(error){
        console.log(error)
        }
    }

    async function editNote(note){
        
        try{
        await axios.put(`http://127.0.0.1:5000/recipe-update`,note)
        getallNotes()
        
        }catch(error){
        console.log(error)
        }
    }
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
  }
  
  useEffect(()=>{
    setfilteredNotes(notes.filter(noteItem =>
      noteItem.data.toLowerCase().includes(searchQuery.toLowerCase()) 
      // || noteItem.data.toLowerCase().includes(searchQuery.toLowerCase()) || noteItem.indegrients.toLowerCase().includes(searchQuery.toLowerCase()) || noteItem.instruction.toLowerCase().includes(searchQuery.toLowerCase())
  ))
  },[searchQuery])
    
    useEffect(()=>{
        document.title = "Home";
        const check = localStorage.getItem("instructorLoggedIn");
        if(check == "false"){
          setHomeloggedin(false);
          Swal.fire({
            title: "Failed to Login",
            text: "We failed to recognize you! Try relogging",
            imageUrl: 'https://media.istockphoto.com/id/648691968/vector/website-error-403-forbidden.jpg?s=612x612&w=0&k=20&c=sSc0Cb2as4BKgH0vFq2o5h1U2vUh4xnayaYkuyFPKh8=',
            // imageWidth:"150",
            imageHeight: '250',
            confirmButtonColor: "rgb(185,28,28)"
          })
          navigate('/login')
        
        }
        else{
            getallNotes()
        }
    },[])

    
  return (
    <>
    {
        homeloggedin?

        <div style={{width:"100%"}}>
          <h1 style={{color:"rgb(85, 62, 201)",marginLeft:"35%"}}>Welcome!! <strong>{log.toUpperCase()}</strong></h1>
          <div className="searchh" style={{width:"20rem",paddingLeft:"2rem"}}>
          <input type="text" placeholder="Search recipes..." value={searchQuery} onChange={handleSearchInputChange} />
          </div>
        <div className='container1'>

          <CreateArea addNote={addNote} />
  
          <div className='allnotes' style={{display:"flex",flexWrap:"wrap"}}>
  
          {filteredNotes.length > 0 ? 
          filteredNotes.map((noteItem, index) =>
            <Card
                key={index}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.contents}
                onDelete={deleteNote}
                onEdit={editNote}
            />
        ):<>
        {revnotes.map((noteItem, index) => 
           
           <Card 
           key={index}
           id={noteItem.id}
           title={noteItem.title}
           content={noteItem.data}
           indegrients={noteItem.indegrients}
           instruction={noteItem.instruction}
           onDelete={deleteNote}
           onEdit = {editNote}
       />
       
       )}
        </>}
          
          
          </div>
  
          </div>
      </div>
      
        :
        <></>
    }
    </>
  )
}

export default Main
