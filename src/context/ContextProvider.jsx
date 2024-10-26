import React, { createContext, useContext, useState } from 'react';

const authContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
        console.log('User logged in:', user); // Log the user object

    };

    const logout = (user) => {
        setUser(null);
    };



    return (
        <authContext.Provider value={{ user, login,logout }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
