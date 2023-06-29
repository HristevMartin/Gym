import React from 'react';
import ForumComment from './ForumComment';
import { useAuth } from '../../context/AuthContext';
import './ForumDetail.css'
import { useState } from 'react';


const ForumCommentsList = ({ comments, id, setRefreshKey }) => { // Added loading prop
    if (comments.length === 0) {

        return (
            <div>
                <p className='no-comments-yet'>No comments yet </p>
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
                    id={comment.id}
                    setRefreshKey={setRefreshKey}
                />
            ))}
        </div>
    );
};

export default ForumCommentsList;
