import { useState,useEffect } from "react"
import axios from "axios"

function App() {

  const [notes,setNotes]=useState([]);

  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
      .then(res => setNotes(res.data.notes))
      .catch(console.error);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/notes")
      .then(res => setNotes(res.data.notes))
      .catch(console.error);
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    let {title,description}=e.target.elements;
    
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNotes();
    })

    
  }

  function handleDelete(noteId){
      axios.delete("http://localhost:3000/api/notes/"+noteId)
        .then(()=>{
          console.log("Note is deleted successfully");
          fetchNotes();
        });
  }
 

  return (
    <>

      <form className="create-note" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Title" className="elem" name="title" />
        <input type="text" placeholder="Enter Title" className="elem" name="description"/>
        <button className="elem">Submit</button>
      </form>
      <div className="notes">
        {
          notes.map((elem)=>(
              <div className="note" key={elem._id}>
                    <h2>{elem.title}</h2>
                    <p>{elem.description}</p>
                    <button onClick={()=>handleDelete(elem._id)}>delete</button>
                </div>           
          ))
        }

      </div>
    </>
  )
}

export default App
