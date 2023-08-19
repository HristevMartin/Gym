import { createContext, useState, useContext, useCallback } from "react";

export const NotificationContext = createContext();

export const types = {
    error: 'danger',
    success: 'success',
    info: 'info',
    warning: 'warning',
}

export const NotificationProvider = ({ children }) => {
    const [notification, setState] = useState({show: false,message: '', type: types.error})

    const addNotification = useCallback((message, type = types.error) => {
        setState({show:true, message, type})

        setTimeout(() => {
            setState({show:false, message: '', type: types.error})
        }, 2000);
        
    }, []);

    const hideNotification = useCallback(() => {
        setState({show:false, message: '', type: types.error})
    }, []);

    return (
        <NotificationContext.Provider  value={{notification, addNotification, hideNotification }}>
        {children}
        </NotificationContext.Provider>
    )
};

export const useNotificationContext = () => {
    const notification = useContext(NotificationContext);

    return notification;
}

export default useNotificationContext;