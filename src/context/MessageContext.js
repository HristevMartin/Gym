// import { createContext, useContext, useState } from 'react';

// export const MessageContext = createContext();

// export const useMessage = () => {
//     return useContext(MessageContext);
// };

// export const MessageProvider = ({ children }) => {
//     const [lastMessageTime, setLastMessageTime] = useState(new Date());

//     return (
//         <MessageContext.Provider value={{ lastMessageTime, setLastMessageTime }}>
//             {children}
//         </MessageContext.Provider>
//     );
// };
