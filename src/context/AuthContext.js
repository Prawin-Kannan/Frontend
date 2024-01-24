import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const signUp = async (userData) => {
        try {
            // Adjust the API endpoint and base URL according to your backend setup
            const response = await axios.post('http://localhost:5000/auth/signup', userData);

            // Optionally, you can handle additional logic here (e.g., update user state)
            const newUser = response.data;
            console.log('New user data:', newUser);
            // Update user state
            setUser(newUser);
        } catch (error) {
            throw new Error('Error signing up');
        }
    };

    // const signIn = (userData) => {
    //     setUser(userData);
    // };

    // const signOut = () => {
    //     setUser(null);
    // };

    return (
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
