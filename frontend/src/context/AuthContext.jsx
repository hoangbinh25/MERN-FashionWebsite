import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // App load first -> get user from localStorage 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []);

    const login = (userData) => {
        // Nếu userData có payload (tức là login Google), lấy payload làm user
        const normalizedUser = userData?.payload ? userData.payload : userData;
        console.log("Login user:", normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
    };

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
