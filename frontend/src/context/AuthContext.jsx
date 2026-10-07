import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);

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
