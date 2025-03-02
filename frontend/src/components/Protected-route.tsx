import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { axiosInstance } from "../utils/api/axios-instance"; 

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null); 

    useEffect(() => {
        const checkAuth = async()=>{
            try {
                await axiosInstance.get('/auth/check-auth');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        }
        checkAuth();
    }, []);


    if (isAuthenticated === null) return null; 
    return isAuthenticated ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
