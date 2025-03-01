import Cookies from 'js-cookie';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ()=>{
    const authToken = Cookies.get('admin_token');

    console.log("Coookie Value : "+authToken);
    console.log("All cookies : " +document.cookie);

    if(!authToken) {
        console.log("No token found!")
        return <Navigate to="/signup" replace/>
    } else {
        console.log("Found token")
        return <Outlet/>;
    }
}

export default ProtectedRoute;