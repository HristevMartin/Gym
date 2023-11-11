import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';


export const Header = (props) => {
    let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";
    let { unreadCount, setUnreadCount } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuth();
    const modalContentRef = useRef()

    const { className, height, headerBorder } = props

    const [showPrograms, setShowPrograms] = useState(false);

    const [senderNames, setSenderNames] = useState([]);

    // const fetchUnreadCount = async () => {
    //     const response = await fetch(`${BASE_URL}/messages/unread-count/${user._id}`);
    //     if (response.status === 200) {
    //         const data = await response.json();
    //         console.log('Fetch Unread Count Response:', data);
    //         setUnreadCount(data.unread_messages_count);
    //         setSenderNames(data.sender_names);
    //     }
    // };

    // useEffect(() => {
    //     if (user.token) {
    //         console.log("Header's useEffect triggered");
    //         fetchUnreadCount();
    //     }
    // }, [unreadCount]);


    const handleMouseOver = () => {
        ;
        setShowPrograms(true);
    };

    const handleMouseOut = () => {
        setShowPrograms(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    let guestNavigation = (
        <>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
        </>

    )

    const programsSection = (
        <div className="programs-overview" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <p>Programs Overview</p>
            <div>
                <a href="/programs">All Programs</a>
            </div>
            <div>
                <a href="/programs">4 day split</a>
            </div>
            <div>
                <a href="/programs">Push and Pull split</a>
            </div>
            <div>
                <a href="/programs">Upper and Lower Body</a>
            </div>
        </div>
    );

    let userNavigation = (
        <>
            <li><a href="/equipment">Gym Equipment</a></li>
            <li><a href="/upload-item">Create Item</a></li>
            {/* <li>
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <a href="/programs">Programs</a>

                    {showPrograms ? programsSection : null}
                </div>

            </li> */}
            <li><a href="/logout">Log Out</a></li>
            <li>
                <a href="/forum">Forum</a>
            </li>
        </>
    );

    const navStyle = {
        "border-bottom": className ? '1px solid lightblue' : 'none',
    };


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <header className="header" style={navStyle}>
            <h2 style={{ 'lineHeight': '15px', 'width': '100px', 'fontWeight': '50px', 'fontSize': '20px' }} className='gym-hub' >Gym Hub</h2>
            <nav className="navigation">
                <ul className="list">
                    <li><a href="/">Home</a></li>
                    {

                        user.token
                            ? userNavigation
                            : guestNavigation
                    }

                </ul>
            </nav>

            {
                user.token ?
                    <div className='profile-section'>
                        <a className='profile-logo' href='/profile'>
                            <FontAwesomeIcon className='logo-profiler' style={{
                                'color': '#fff', 'margin-right': '10px', 'font-size': '1.2em'
                            }} icon={faUser} />
                        </a>
                        {unreadCount > 0 &&
                            <span className='unread-count' onClick={toggleModal}>
                                {unreadCount}
                            </span>
                        }
                    </div>
                    : null
            }

            {
                isModalOpen &&
                <div className="modal">
                    <div className="modal-content" ref={modalContentRef}>
                        <h4 style={{ 'border-bottom': '1px solid black' }}>Unread Messages From:</h4>
                        <ul>
                            {senderNames.map((name, index) => (
                                <Link className='link-header' to={`/chat/${name.sender_id}?username=${name.modified_email}`}
                                onClick={() => setIsModalOpen(false)}
                                >
                                    <li style={{ 'margin-top': '10px', 'margin-left': '10px' }} key={index}>{name.modified_email}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            }

        </header>
    )
}


export default Header;