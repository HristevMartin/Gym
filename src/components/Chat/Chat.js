import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useAuth } from '../../context/AuthContext';
import { useParams, useLocation } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';

const Chat = (
    {
        setUnreadCount,
        unreadCount
    }
    
) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [chattingWithUsername, setChattingWithUsername] = useState("");
    const { user } = useAuth();
    const currentUserId = user._id;
    const currentEmailId = user.email.split('@')[0]

    const location = useLocation();
    const nameChat = location.search.split('?')[1].split('=')[1];

    const { userId } = useParams();

    const optimisticallyAddMessage = (messageObj) => {
        setMessages(prev => [...prev, {
            ...messageObj,
            status: "Sent",  // Optimistically set status as "Sent"
            username: user.username, // Assuming the user's name is available from the auth context
            timestamp: new Date().toISOString()  // Set the current time as a timestamp
        }]);
    };

    let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const getMessagesData = async () => {
        let url = `${BASE_URL}/chat/${currentUserId}/${userId}`
        const request = await fetch(`${url}`)
        if (request.status === 200) {
            const data = await request.json()
            if (data.length) {
                setChattingWithUsername(data[0].username);
            }
            
            setMessages(data)
        }
    };

    useEffect(() => {
        getMessagesData();
    }, []);

    const handleSendMessage = async () => {
        if (currentMessage.trim() !== '') {
            const messageObj = {
                chat_id: `${currentUserId}_${userId}`,
                sender_id: currentUserId,
                text: currentMessage,
                status: "Not Viewed"
            };

            console.log('show me the messageObj', messageObj);

            optimisticallyAddMessage(messageObj);

            const response = await fetch(`http://127.0.0.1:5000/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageObj),
            });
            const responseData = await response.json();
            if (responseData.message === 'Message sent successfully') {
                setCurrentMessage('');
                getMessagesData();
            }

        }
    };

    const handleMarkAsRead = async (messageId) => {
        const response = await fetch(`http://127.0.0.1:5000/chat/message/mark-as-read/${messageId}`, {
            method: 'PUT',
        });
        const responseData = await response.json();
        if (responseData.message === 'Message marked as read') {
            // Refresh messages or update local state to reflect the change
            getMessagesData();
        }
    };

    return (
        <div className='global-chat-container'>
            <div className='class-members'>
                <div className='class-members-header'>
                    <h1 className='header-inbox'>Members</h1>
                </div>
                <div className='class-members-list'>
                    <ul>
                        <li className='list-items'>
                            <p className='other-person'>{nameChat}</p>
                        </li>
                    </ul>
                    <ul className='class-members-list-owner'>
                        <li className='list-items'>
                            <p className='you-are-owner'>{currentEmailId}</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="chat-container">
                {
                    <div className="chat-header">
                        Chat with {nameChat}
                    </div>
                }
                <div className="chat-messages">
                    {messages.map((message, index) => {
                        const messageType = message.sender_id === currentUserId ? 'sent' : 'received';
                        const isUnread = messageType === 'received' && message.status === "Sent";
                        return (
                            <div key={index} className={`message ${messageType} ${isUnread ? 'unread' : ''}`}
                                onClick={() => handleMarkAsRead(message.id)}>
                                <div className='text-wrapper-chat'>
                                    <div style={{ 'margin-bottom': '15px' }} className="sender-name">{message.username}</div>
                                    <div className='wrapper-text'>{message.text}</div>
                                    {messageType === 'sent' &&
                                        <div className="message-status">
                                            <p className='message-status'> {message.status}</p>
                                        </div>}
                                </div>
                                <div className='timestamp'>{message.timestamp}</div>
                            </div>
                        )
                    })}
                </div>



                <div className="chat-input">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Type your message..."
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button style={{ 'martin-top': '5px' }} className='message-sent' onClick={handleSendMessage}>Sent</button>
                </div>
            </div>
        </div>

    );
};

export default Chat;
