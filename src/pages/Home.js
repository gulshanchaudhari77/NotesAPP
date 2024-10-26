import React, { useState, useNavigate, useEffect } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "axios";
import Card from "../components/Card";
import { toast,ToastContainer } from "react-toastify";



const Home = () => {
  const [isModelOpen, setModalOpen] = useState(false);

  const [notes, setNotes] = useState([]);

  const [currentNote ,setcurrentNote]=useState(null);

  const[query,setquery]=useState('');
  const[filternotes,setfilternotes]=useState([]);

  const onEdit =(note)=>{
    setcurrentNote(note);
    setModalOpen(true)

  }
  const closemodel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming token is stored in local storage
      const { data } = await axios.get("http://localhost:5000/api/v1/getnote", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token here
        },
      });

      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, desc) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/add",
        {title, desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        closemodel();
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
    
  };



  const editNote =async(id,title,desc)=>{

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/updateNote/${id}`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        closemodel();
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }


  }

  const deleteNote = async (id)=>{
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/deletenote/${id}`,
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("delete toast");
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    setfilternotes(
      notes.filter((note) =>
        (note.title?.toLowerCase().includes(query.toLowerCase()) || 
         note.desc?.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [query, notes]);
  

  return (
    <div className="h-screen   bg-blue-900 ">
      <Navbar setquery={setquery} />

      <div className="px-4 pt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        { filternotes.length > 1  ? filternotes.map((note) => (
          <Card note={note} key={note.id} onEdit={onEdit} deleteNote={deleteNote} />
        )):<p>no data</p>}
      </div>

     
      {/* <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bolt p-5"
      >
        +
      </button>


      {isModelOpen && <Modal closemodel={closemodel} addNote={addNote} />} */}

<button
  onClick={() => setModalOpen(true)}
  className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-5"
>
  +
</button>

{isModelOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <Modal closeModal={closemodel} addNote={addNote} currentNote={currentNote} editNote={editNote}  />
  </div>
)}

    </div>
  );
};

export default Home;
