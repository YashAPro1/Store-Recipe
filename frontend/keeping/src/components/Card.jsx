import React ,{useState} from 'react'
import './css/Navbar.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function Card(props) {
  const [newTitle, setTitle] = useState(props.title);
  const [newDescription, setDescription] = useState(props.content);
  const [indegrients, setIndegrients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [show, setShow] = useState(false);
  const [userid,setuserid] = useState(localStorage.getItem('userid'));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEditClick(title,description,indegrients,instruction) {
   handleClose()
   const note = {
    "id" : props.id,
    "user":userid,
    "title":title,
    "contents":description,
    "indegrients" : indegrients,
    "instruction" : instruction,

   }
   props.onEdit(note)
   setTitle(props.title)
   setDescription(props.content)
   setIndegrients(props.indegrients)
   setInstruction(props.instruction)
  }
  
  

  // function handleEditClick() {
  //   props.onEdit(props.id);
  // }

  return (
    <div className="card">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>{props.indegrients}</p>
      <p>{props.instruction}</p>
      <div className='btns'>

      
      <button style={{flex:5}} onClick={handleClick}>DELETE</button>
      <button style={{flex:5}} onClick={handleShow}>Edit</button>
      
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                <div className="modal-body">
                    <input 
                    name="title" 
                    value = {newTitle}
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title" 
                    />
                    <textarea style={{margin:"2px"}}
                    value = {newDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    name="content" 
                    placeholder="Take a note..." 
                    />
                    <textarea 
                    value = {indegrients}
                    onChange={(e) => setIndegrients(e.target.value)}
                    name="indegrients" 
                    placeholder="add indegrients..." 
                    />
                    <textarea 
                    value = {instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    name="instruction" 
                    placeholder="add instruction..." 
                    />
                    
                </div>
                    
                </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditClick(newTitle,newDescription,indegrients,instruction)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    
  );
}
