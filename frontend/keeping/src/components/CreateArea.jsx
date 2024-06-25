import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateArea({addNote}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [indegrients, setIndegrients] = useState("");
    const [instruction, setInstruction] = useState("");
    const [show, setShow] = useState(false);
    const [userid,setuserid] = useState(localStorage.getItem('userid'));
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   

    function submitNote(event){
        
        event.preventDefault();
        addNote({
            "user":userid,
            "title" :title,
            "contents" : description,
            "indegrients" : indegrients,
            "instruction" : instruction,
            "completed" :false
        })
        setTitle("")
        setDescription("")

    }

    return(
        <>
        
       
            <div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                    <div className="modal-body">
                        <input 
                        name="title" 
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title" 
                        />
                        <textarea 
                        value = {description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="content" 
                        placeholder="Take a note..." 
                        rows="3"
                        />
                        <textarea 
                        value = {indegrients}
                        onChange={(e) => setIndegrients(e.target.value)}
                        name="indegrients" 
                        placeholder="add indegrients..." 
                        rows="3"
                        />
                        <textarea 
                        value = {instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        name="instruction" 
                        placeholder="add instruction..." 
                        rows="3"
                        />
                        
                    </div>
                        
                    </form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={submitNote}>
                Add
            </Button>
            </Modal.Footer>
            </Modal>
            </div>
            
            <div style={{position:"fixed",bottom:"2rem",right:'2rem'}}>

            <button style={{width:"100%",height:"100%",padding:"1rem",borderRadius:"0.5rem"}} onClick={handleShow}>+</button>
            
                {/* <form >
                <div className="modal-body">
                    <input 
                    name="title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value = {title}
                    placeholder="Title" 
                    />
                    <textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    name="content" 
                    value = {description}
                    placeholder="Add Recipes description..." 
                    rows="1"
                    />
                    <textarea 
                    onChange={(e) => setIndegrients(e.target.value)}
                    name="indegrients" 
                    value = {indegrients}
                    placeholder="Add indegrients..." 
                    rows="1"
                    />
                    <textarea 
                    onChange={(e) => setInstruction(e.target.value)}
                    name="instruction" 
                    value = {instruction}
                    placeholder="Add instruction..." 
                    rows="1"
                    />
                    
                </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"  onClick={submitNote} >Add</button>
                    </div>
                </form> */}
                </div>
                
        
        </>
    )
}

export default CreateArea ;


 