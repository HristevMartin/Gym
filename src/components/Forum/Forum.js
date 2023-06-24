import './Forum.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ForumTopics from './ForumTopics';
import useNotificationContext from '../../context/NotificationContext';


export const Forum = () => {

    const [isHovered, setIsHovered] = useState(false);

    const {addNotification} = useNotificationContext();

    const { user } = useAuth()

    const [forumTopics, setForumTopics] = useState([])

    const getForumTopics = async () => {
        const request = await fetch('http://localhost:5000/forum-data', {
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
    
    useEffect(() => {
        console.log('Forum component mounted');
        getForumTopics();
    
        return () => {
            console.log('Forum component unmounted');
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

        const request = await fetch('http://localhost:5000/forum-data', {
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
        }
    }



    return (
        <div className='main-forum-container'>
            <div className='main-forum-subnav'>
                <li>Categories</li>
                <li>Topics</li>
                <li>Search</li>
                <li>My Questions</li>

                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <a href='post-question'>Ask Question</a>
                    {isHovered && (

                        <div className="hover-form">
                            <form onSubmit={forumTopicSubmit}>
                                <input name='title' type="text" placeholder="Title" />
                                <textarea name='description' placeholder="Description"></textarea>
                                <button type="submit">Submit</button>
                            </form>

                        </div>
                    )}
                </li>
            </div>

            <div className='main-forum-topics'>
                <h1>Gym Questions</h1>
            </div>



            <div className='main-forum-topic-test1'>
                <h1 className='main-forum-container-title'>Recently Added</h1>
                {
                    forumTopics.map((x) => {
                        const {id, title, description, views, likes, comments } = x;


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
                        />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Forum;

