import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout2 } from "../../services/authServices";

export const LogOut = () => {
    const { user, logout } = useAuth();

    let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const navigate = useNavigate();

    useEffect(() => {
        const requestUser = async () => {
            const request = await fetch(`${BASE_URL}/logout`, {
                'headers': {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            return request;
        }
        requestUser()
            .then(x => {
                if (x.status === 204) {
                    console.log(x.status)
                    logout();
                    navigate('/');
                }
            })
    }, [user.token]);



}

export default LogOut;
