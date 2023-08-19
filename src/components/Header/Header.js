import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/AuthContext';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";



export const Header = (props) => {

    const { user } = useAuth();

    const { className, height, headerBorder } = props

    const [showPrograms, setShowPrograms] = useState(false);

    const handleMouseOver = () => {
        ;
        setShowPrograms(true);
    };

    const handleMouseOut = () => {
        setShowPrograms(false);
    };



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

    return (
        <header className="header" style={navStyle}>
            <h2 style={{'lineHeight': '15px', 'width':'100px','fontWeight':'50px','fontSize':'20px'}} className='gym-hub' >Gym Hub</h2>
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
                user.token ? <a className='profile-logo' href='/profile'><FontAwesomeIcon className='logo-profiler' style={{
                    'color': '#fff', 'margin-right': '20px', 'font-size': '1.2em'
                }}
                    icon={faUser} /></a>
                    : null
            }

        </header>
    )
}


export default Header;