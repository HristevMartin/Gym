import './Forum.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ForumTopics from './ForumTopics';
import useNotificationContext from '../../context/NotificationContext';
import { useRef } from 'react';

export const Forum = () => {
    const BASE_URL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://gym-pro-website.herokuapp.com";

    const { addNotification } = useNotificationContext();

    const { user } = useAuth()

    const [forumTopics, setForumTopics] = useState([])

    const [userData, setUserData] = useState(null);

    const getForumTopics = async () => {
        const request = await fetch(`${BASE_URL}/forum-data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })

        if (request.status === 200) {
            const data = await request.json()
            setForumTopics(data)
        } else {
            alert('Something went wrong')
        }
    }

    
    let getProfileInformationData = async () => {
        let request = await fetch(`${BASE_URL}/get-active-users`)

        if (request.ok) {
            let data = await request.json()
            console.log('show me initial data', data)
            return data
        } else {
            console.log('Something went wrong while getting the logged data')
        }
    }

    useEffect(() => {
        getForumTopics();
    
        let getProfileInformation = async () => {
            let data = await getProfileInformationData()
            setUserData(data)
        }
    
        getProfileInformation();
    
        const pingInterval = setInterval(() => {
            fetch(`${BASE_URL}/ping`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            }).catch((error) => {
                console.error('Error:', error);
            });
        }, 6 * 60 * 60 * 1000);
    
        return () => {
            console.log('Forum component unmounted');
            clearInterval(pingInterval);
        };
    }, []);
    
    

    let forumTopicSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.target);

        let title = '';
        let description = '';

        for (let pair of data.entries()) {
            if (pair[0] === 'title') {
                title = pair[1];
            } else if (pair[0] === 'description') {
                description = pair[1];
            }
        }

        const request = await fetch(`${BASE_URL}/forum-data`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
            })
        });

        if (request.status === 201) {
            addNotification('Question submitted', 'success')
            getForumTopics()
            setIsClicked(false);
        }
    }
    const [isClicked, setIsClicked] = useState(false);
    const formRef = useRef(null);

    const handleTopicDeleted = (id) => {
        setForumTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
    };

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setIsClicked(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
    
        document.addEventListener("click", checkIfClickedOutside);
    
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);
    

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);


    return (
        <div className='main-forum-container'>

            <div className='main-forum-topics'>
                <h1 className='gym-questions'>Gym Forum</h1>
            </div>

            <div className='wrapper-interact'>
                <div>
                    <li className='ask-question-forum' ref={formRef} onClick={() => setIsClicked(!isClicked)}>
                        <a className='ask-question-element'>Ask Question</a>
                        {isClicked && (

                            <div className="hover-form" onClick={(e) => e.stopPropagation()} style={{zIndex: 999}}>
                                <form onSubmit={forumTopicSubmit}>
                                    <input name='title' type="text" placeholder="Title" />
                                    <textarea name='description' placeholder="Description"></textarea>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        )}
                    </li>
                </div>

                <div className='dropdown-container'>
                    <button ref={dropdownRef} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        Click to See Online Users
                    </button>

                    {isDropdownOpen && (
                        <div style={{ 'border': '1px solid white' }} className='main-forum-profile-users'>
                            {userData ? (
                                userData.map((user, index) => (
                                    <div key={index} className='profile-users-gen'>
                                        {user.user_image ? (
                                            <img
                                                className='profile-user-gen-image'
                                                src={user.user_image}
                                                alt={`User ${index + 1} Profile`}
                                            />
                                        )
                                            :
                                            <p style={{'margin-left': '6px', fontSize: '10px', textAlign: 'center', 'padding-right': '15px', 'margin-top': '10px' }}>No Image</p>
                                        }
                                        <p style={{ 'textAlign': 'center', 'margin-left': '-2px', 'margin-bottom':'5px' }} className='profile-users-gen-name'>{user.user_name}</p>
                                        <p className="active-dot"></p>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <p className='no-active-users'>No active users</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className='main-forum-topic-test1'>
                {
                    forumTopics.map((x) => {
                        const { id, title, description, views, likes, comments, user_id } = x;

                        const normalizedLikes = likes || 0;
                        const normalizedComments = comments || 0;
                        const normalizedViews = views || 0;

                        return (<ForumTopics
                            key={id}
                            title={title}
                            description={description}
                            views={normalizedViews}
                            likes={normalizedLikes}
                            comments={normalizedComments}
                            id={id}
                            user_id={user_id}
                            onTopicDeleted={handleTopicDeleted}
                        />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Forum;

