import { Navigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

export function RequireAuth({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/auth/login" replace />;
}

export function RequireAdmin({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/auth/login" replace />;
    return user.role ? children : <Navigate to="/user/home" replace />;
}
