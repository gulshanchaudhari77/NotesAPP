import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const navigate =useNavigate();



    const submitHandler = async(e) =>{
        e.preventDefault();
        console.log(name,password,email);

        try{
            const response = await axios.post('http://localhost:5000/api/v1/register',
                {name,email,password}
            );

            if(response.data.success)
            {
                navigate('/login')    
                localStorage.setItem("name",response.data.name)
            }

            console.log(response);

        }
        catch(error){
            console.log(error)

        }



    }

   

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border shadow p-6 w-80 bg-white'> 
        <h2 className='text-2xl font-bold mb-5 text-center'>sign-up</h2>



        <form  onSubmit={submitHandler}>

            <div className='mb-4'>
                 <label htmlFor="name">Name</label> <br></br>
                 <input type="text" className='border-2 p-1'

                 onChange={(e)=>{
                    setName(e.target.value)
                }}
                 value={name}
                 
                 placeholder='enter name' />

                 
            </div>

            <div className='mb-4'>
                 <label htmlFor="email">email</label> <br></br>
                 <input type="email" className='border-2 p-1' 
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}

                  placeholder='enter email' />
            </div>


            <div className='mb-4'>
                 <label htmlFor="password">password</label> <br></br>
                 <input type="password" className='border-2 p-1'
             onChange={(e)=>{setPassword(e.target.value)}}
             value={password}

                 
                 placeholder='enter password' />
            </div>

            <button className='bg-blue-700 rounded-lg p-3 text-white font-bold text-2xl w-[200px] mb-2'>Sign-Up</button>

            <p>already have account <a href="/login">login</a></p>
        </form>
    </div>

    </div>

  )
}

export default Signup