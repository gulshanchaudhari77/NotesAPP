import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const Login = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const navigate =useNavigate();
    const{login}=useAuth();


    const submitHandler = async(e) =>{
        e.preventDefault();
        console.log(password,email);

        try{
            const response = await axios.post('http://localhost:5000/api/v1/login',
                {email,password}

               
            );
            

            if(response.data.success)
            {
                login(response.data.user);
                localStorage.setItem("token",response.data.jwtToken)
                localStorage.setItem("name",response.data.name)
                toast.success("loggin-succcesfully!")


                navigate('/')           }
                console.log("respone user",response.data.user)

            console.log(response);
            console.log(response.data.user); // Check the structure of the user object


        }
        catch(error){
            console.log(error)

        }



    }

   

  return (
    <div className='flex justify-center items-center  h-screen'>
        <div className='border shadow p-6 w-80 bg-white'> 
        <h2 className='text-2xl font-bold mb-5 text-center'>Login</h2>



        <form  onSubmit={submitHandler}>

            

            <div className='mb-4'>
                 <label htmlFor="email ">Email</label> <br></br>
                 <input type="email" className='border-2 p-1' 
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}

                  placeholder='enter email' />
            </div>


            <div className='mb-4'>
                 <label htmlFor="password">Password</label> <br></br>
                 <input type="password" className='border-2 p-1'
             onChange={(e)=>{setPassword(e.target.value)}}
             value={password}

                 
                 placeholder='enter password' />
            </div>

            <button className='bg-blue-700 rounded-lg p-3 text-white font-bold text-2xl w-[200px] mb-2'>log-in</button>

            <p>Already Have Account <a href="/register">Sign-Up</a></p>
        </form>
    </div>

    </div>

  )
}

export default Login






