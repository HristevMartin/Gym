import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorageHook";


const initialUserState = {
    _id: '',
    email: '',
    token: '',
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialUserState);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        console.log('calling the logOut function')
        setUser(initialUserState);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
