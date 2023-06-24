import React from 'react';
import ForumComment from './ForumComment';
import { useAuth } from '../../context/AuthContext';
import './ForumDetail.css'
import { useState } from 'react';
import { useRef } from 'react';

const ForumCommentsList = ({ comments, id, setRefreshKey }) => { // Added loading prop

    const [isHovered, setIsHovered] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        let description = '';


        for (let pair of data.entries()) {
            if (pair[0] === 'comment') {
                description = pair[1];
            }
        }

        const request = await fetch(`http://localhost:5000/save-comment/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: description,
            })

            
        })

        if (request.status === 201) {
            const data = await request.json();
            console.log(data);
            setRefreshKey(prevKey => prevKey + 1);
        } 

        setNewComment('');
    }

    if (comments.length === 0) {
        return (
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <p className='no-comments-yet'>No comments yet </p>
                <p className='add-comment'>Add a comment</p>
                {isHovered &&
                    <div className="input-section">
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                name='comment'
                                className="input-textarea"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                            />
                            <button style={{ 'margin': 'auto', 'display': 'block' }} >Submit</button>
                        </form>
                    </div>
                }
            </div>
        );
    }

    return (
        <div>
            {comments.map((comment) => (
                <ForumComment
                    key={comment.id}
                    content={comment.content}
                    forum_id={comment.forum_id}
                />
            ))}
        </div>
    );
};

export default ForumCommentsList;
