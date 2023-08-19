import React from 'react';
import ForumComment from './ForumComment';
import './ForumDetail.css'

const ForumCommentsList = ({ comments, id, setRefreshKey, userId }) => { // Added loading prop
    // if (comments.length === 0) {

    //     return (
    //         <div>
    //             <p className='no-comments-yet'>No comments yet </p>
    //         </div>
    //     );
    // }

    const isComments = comments.length === 0 ? true : false;


    return (
        <div className='comments-main-comment'>
            {
                isComments
                    ? <p className='no-commentss-yet'>No comments yet </p>
                    : comments.map((comment) => (
                        <ForumComment
                            key={comment.id}
                            content={comment.content}
                            forum_id={comment.forum_id}
                            id={comment.id}
                            setRefreshKey={setRefreshKey}
                            userId={userId}
                            commentUserId={comment.user_id}
                        />
                    ))
            }
        </div>

    );
};

export default ForumCommentsList;
