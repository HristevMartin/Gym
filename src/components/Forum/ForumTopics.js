import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

export const ForumTopics = ({
    id,views,likes,comments,title
}) => {

    return (
        <div className='main-forum-topic-cards'>
            <div className='main-forum-cards'>
                <Link to={`/forum/${id}`}>
                    <h1 className='title-main'>{title}</h1>
                </Link>
            </div>
            <div className='main-forum-labels'>


                <span><FontAwesomeIcon icon={faEye} />{' '} {views}</span>
                <span><FontAwesomeIcon icon={faThumbsUp} /> {likes}</span>
                <span className='last-span'><FontAwesomeIcon icon={faComments} />{comments}</span>



            </div>
        </div>
    )
}

export default ForumTopics;