import axios from 'axios';
import React, { useEffect, useState  } from 'react'
import { useNavigate} from 'react-router-dom';


const Modal = ({closemodel,addNote,currentNote,editNote}) => {
    const[title,setTile]=useState('');
    const[desc,setdesc]=useState('');
    console.log(title,desc);
    const navigate =useNavigate();


    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(currentNote)
        {
            editNote(currentNote._id,title,desc)

        }
        else{
            addNote(title,desc);

        }
       
    }

    

    useEffect(()=>{
        if(currentNote){
            setTile(currentNote.title);
            setdesc(currentNote.desc)
        }

    },[currentNote])


  return (
    <div className='bg-white shadow-lg rounded p-8 a'>
        <h1 className=''>{currentNote ? "Edit Noteadd ":" Add NeW Note "}</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <input type="text" className='bg-transparent border-2 '
            onChange={(e)=>setTile(e.target.value)}
            value={title}

             placeholder='note title' />


            <input type="text" 
            onChange={(e)=>setdesc(e.target.value)}
            value={desc}
            
            placeholder='note dec'/>

       <div>

        <div className='flex justify-between'>

       <button className='bg-green-800 p-3 rounded-lg shadow text-white'>{currentNote ?"EDIT":"Add"}</button>

<button onClick={closemodel} className='bg-red-800 p-3 rounded-lg shadow text-white font-bold'>cancle</button>
</div>

       </div>

        </form>

        
    </div>
  )
}

export default Modal