import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import useNotificationContext from '../../context/NotificationContext';

function CommentItem({ comment,
    commentId,
    itemId,
    token,
    userId,
    commentUserId,
    editSuccess
}) { 

    let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";


    const [userHasLiked, setUserHasLiked] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);
    const { addNotification } = useNotificationContext();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);



    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        let request = async () => {
            let response = await fetch(`${BASE_URL}/likes/${commentId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
            if (response.status === 200) {
                let data = await response.json()
                setLikeCount(data.like_count)
                setUserHasLiked(data.user_has_liked)
            }
        }
        request()
    }, [commentId]);

    const handleLike = () => {
        const request = async () => {
            const response = await fetch(`${BASE_URL}/likes/${commentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ commentId, itemId })
            });

            const data = await response.json();

            if (response.ok) {
                setUserHasLiked(!userHasLiked);
                setLikeCount(data.like_count);
            } else {
                addNotification(data.message, 'danger');
            }
        };
        request();
    };

    const [editComment, setEditComment] = useState(false);

    const handleEdit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/modify-comment/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                edited_comment: editedComment,
                item_id: itemId
            })
        });
        console.log('show me the response', response);
        if (response.ok) {
            const data = await response.json();
            setEditedComment(data.message);
            editSuccess();
            setEditComment(false)
        } else {
            addNotification('Failed to edit comment', 'danger');
        }
    };


    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        const response = await fetch(`${BASE_URL}/modify-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        console.log('show me the response status', response.status)

        if (response.status === 204){
            addNotification('Comment deleted successfully', 'success')
            setShowDeleteConfirmation(false);
            editSuccess();
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const currentUser = userId === commentUserId;

    return (
        <>
            <div className='comment-item-section'>
                <li className="comment-item">
                    {editComment ? (
                        <div className='edit-comment-wrapper'>
                            <div className='edit-comment-item-detail'>
                                <form onSubmit={handleEdit}>
                                    <input
                                        type='text'
                                        name='comment'
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    />
                                    <button className='item-detail-submit' type='submit'>Submit</button>
                                </form>
                            </div>
                            <button className="btn-edit-cancel" onClick={() => setEditComment(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className='comment-and-delete'>
                                <span style={{'margin-top':'4px'}} className='title-comment-item-detail'>{comment}</span>
                                {currentUser && (
                                    <div className='buttons-comment-item-detail'>
                                        <button className="btn-edit" onClick={() => setEditComment(true)}>Edit</button>
                                        <button className="btn-delete" onClick={handleDelete}>Delete</button>
                                    </div>
                                )}
                                {
                                    showDeleteConfirmation && (
                                        <div className="confirm-delete">
                                            <p>Are you sure you want to delete this comment?</p>
                                            <div className='buttons-modify'>
                                                <button className='deleteit' onClick={confirmDelete}>Yes</button>
                                                <button className='donotdeleteit' onClick={cancelDelete}>No</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>

                    )}

                </li>


            </div>




            <div className="like-dislike-buttons" style={{ 'marginTop': '10px' }}>
                <button className={`like-dislike ${userHasLiked ? 'liked' : ''}`} onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>

                <p className='item-detail-like-count'>{likeCount}</p>
            </div>
        </>
    );



}

export default CommentItem;
