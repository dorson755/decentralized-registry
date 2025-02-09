import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode or fetch user details (if needed)
            setUser({ isAuthenticated: true }); // Simplified for now
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
