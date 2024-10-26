import React from 'react';
import { useAuth } from '../context/ContextProvider'; // Importing the useAuth hook
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { toast } from 'react-toastify';

const Navbar = ({setquery}) => {
    const { user, logout } = useAuth(); // Destructure user and logout function
    console.log('Current user in Navbar:', user); // Log the user state

    const navigate = useNavigate(); // Use useNavigate for navigating after logout

    const handleLogout = () => {
        logout(); // Call the logout function from context
        localStorage.removeItem("token"); // Optionally remove the token from local storage
        localStorage.removeItem("name"); // Optionally remove the name from local storage
        navigate('/login'); // Redirect to login page after logout
        toast.success("log-out")
    };

    return (
        <nav className='flex justify-between px-5 py-5 bg-black text-white'>
            <div>
                <h1 className='text-2xl'>Note-App</h1>
            </div>

            <div>
                <input className='rounded-lg p-2'
                onChange={(e)=>setquery(e.target.value)}
                 type="text" placeholder="Search..." />
            </div>

            <div className='flex gap-6 text-2xl'>
                {
                    !user ? (
                        <>
                            <Link to='/login'>Login</Link>
                            <button onClick={() => navigate('/register')}>Sign Up</button> {/* Navigate to signup page */}
                        </>
                    ) : (
                        <>
                            <h2 className='text-2xl text-red-300 '>{user.name}</h2>
                            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
                        </>
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar;
