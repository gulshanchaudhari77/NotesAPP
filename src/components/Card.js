import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Card = ({note,onEdit,deleteNote}) => {
    console.log("note in card",note)
  return (
    <div className='bg-gray-300 p-4 rounded shadow max-h-[130px] text-center'>
        
        <h2 className='text-3xl fonr-bold'>{note.title}</h2>
        <p className='from-neutral-500 '>{note.desc}</p>

        <div className='flex justify-center gap-5 mt-2'>
            <button className='text-blue-500 mr-2 text-2xl' 
            onClick={()=>onEdit(note)}>
                <FaEdit />
            </button>
            <button className='text-red-700 text-2xl'
            onClick={()=>deleteNote(note._id)}
            
            ><FaTrash/></button>

        </div>
    </div>
  )
}

export default Card