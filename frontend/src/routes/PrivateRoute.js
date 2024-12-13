import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute(props) {
    
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.loginUser)
    useEffect(() => {
        if (userLogin && !userLogin.isAuthenticated) {
            navigate('/login')
        }
    }, [])
    

    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;