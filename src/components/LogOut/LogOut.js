import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
            console.log('show request', request)
            return request;
        }
        try{
        requestUser()
            .then(x => {
                if (x.status === 204) {
                    console.log(x.status)
                    logout();
                    navigate('/');
                }
            })
        } catch (err) {
            console.log('been here')
            console.log(err)
        }

    }, []);



}

export default LogOut;
