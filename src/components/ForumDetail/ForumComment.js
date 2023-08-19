import React, { useState, useRef, useEffect } from 'react';
import './ForumComment.css';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';


const ForumComment = ({ content, forum_id, id, setRefreshKey, userId, commentUserId }) => {
    const { user } = useAuth();
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emojiReactions, setEmojiReactions] = useState({});

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const [reactionId, setReactionId] = useState(null);

    const emojiPickerRef = useRef();
    const emojis = ["👍", "😅", "🤣", "🥲", "😭", "😕", "😎"];

    let ownComment = commentUserId === userId;
    // edit comment

    const handleInputChange = (e) => {
        setEditedContent(e.target.value);
    };

    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const [originalContent, setOriginalContent] = useState(content);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };


    const confirmDelete = async () => {
        console.log('delete confirmed', id);

        const request = await fetch(`${BASE_URL}/delete_comment/${id}`, {
            method: 'DELETE',
        })

        if (request.status === 200) {
            console.log('comment deleted');
            setRefreshKey(prevKey => prevKey + 1);
        }

        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    // 

    const handleCancelEditing = () => {
        setEditedContent(originalContent);
        setEditing(false);
        setEditDeleteHoover(false);
    };

    const handleEdit = () => {
        setOriginalContent(editedContent);
        setEditing(true);
    };

    const handleDoneEditing = async () => {

        const request = await fetch(`${BASE_URL}/edit-delete-comment/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                content: editedContent,
            }),
        })

        if (request.ok) {
            const data = await request.json();
            console.log('here', data);
            setRefreshKey(prevKey => prevKey + 1);
        }

        setEditing(false);
        setEditDeleteHoover(false);
    };


    // 
    const fetchUsernames = async (userIds) => {
        try {
            const response = await fetch(`${BASE_URL}/get-usernames`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(userIds),
            });



            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch usernames:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        return {};
    };

    const fetchReactions = async () => {
        setLoading(true);
        try {
            const fetchId = reactionId || id;
            const response = await fetch(`${BASE_URL}/get-emoji/${fetchId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userReaction = data.find(reaction => String(reaction.user_id) === String(user._id));

                if (userReaction) {
                    setSelectedEmoji(userReaction.emoji);
                } else {
                    console.log('No user reaction found in fetched reactions');
                }

                const userIds = data.map(reaction => reaction.user_id);
                const usernames = await fetchUsernames(userIds);

                setEmojiReactions(data.reduce((obj, reaction) => {
                    const username = usernames[reaction.user_id] || 'Unknown';
                    (obj[reaction.emoji] = obj[reaction.emoji] || []).push(username);
                    return obj;
                }, {}));
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    const saveReaction = async (emoji) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/save-emoji`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    emoji,
                    id,
                    forum_id,
                }),
            });

            if (response.ok) {
                console.log('Reaction saved to server successfully');
                const data = await response.json();
                setReactionId(data.id);
                await fetchReactions();
            } else {
                console.error('Failed to save reaction:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    const removeReaction = async (emoji) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/remove-emoji`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    emoji,
                    id,
                    forum_id,
                }),
            });
    
            if (response.ok) {
                console.log('Reaction removed from server successfully');
                setSelectedEmoji(null);
                await fetchReactions();
            } else {
                console.error('Failed to remove reaction:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmojiClick = async (emoji) => {
        setShowEmojis(false);
        if (emoji === selectedEmoji) {
            await removeReaction(emoji);
        } else {
            saveReaction(emoji);
        }
    };


    const handleClickOutside = (event) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setShowEmojis(false);

        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchReactions();
        setRefreshKey(prevKey => prevKey + 1);
    }, [forum_id, reactionId, user]);

    const [editDeleteHoover, setEditDeleteHoover] = useState(false);

    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setEditDeleteHoover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="main-comments-section">
            <div className='main-commets-detail-section'>
                {!editing ?
                    <p className="forum-content">{content}</p>
                    :
                    <textarea className="forum-content edit-textarea" value={editedContent} onChange={handleInputChange} />

                }


                <div className="interaction-section">
                    <div>
                        {editing &&
                            <div>
                                <button className='edit-button-comment' onClick={handleDoneEditing}>Done</button>
                                <button className='edit-button-comment' onClick={handleCancelEditing}>Cancel</button>
                            </div>
                        }

                        <button
                            className={`emoji-picker ${selectedEmoji ? 'emoji-selected' : ''}`}
                            onClick={() => setShowEmojis(!showEmojis)}
                        >
                            Like
                        </button>

                    </div>

                    {showEmojis && (
                        <div ref={emojiPickerRef} className="emoji-options">
                            {emojis.map((emoji, index) => (
                                <button
                                    className={`emoji ${selectedEmoji === emoji ? 'emoji-selected' : ''}`}
                                    key={index}
                                    onClick={() => handleEmojiClick(emoji)}
                                    disabled={loading}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {Object.entries(emojiReactions).map(([emoji, users], index) => (
                    <div key={index} className="reaction">
                        <span className="emoji">{emoji}</span>
                        <span className="emoji-count">{users.length}</span>
                        <div className="emoji-tooltip">
                            {users.map((user, index) => (
                                <p className='user-usernames' key={index}>{user}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className='comments-edit-section-parent'>
                {
                    ownComment &&
                    <>
                        <FontAwesomeIcon onClick={() => setEditDeleteHoover(prev => !prev)}
                            className='comments-edit-section' size='lg' icon={faList} />

                        {editDeleteHoover && !editing &&
                            <div className='comment-edit-ammend' ref={menuRef}>
                                <div className='comment-edit-amment-description'>
                                    <div className='comment-edit-amment-edit-delete' >
                                        <p className='edit-comment' onClick={handleEdit}>Edit</p>
                                        <p className='delete-comment' onClick={handleDeleteClick}>Delete</p>
                                    </div>
                                </div>
                            </div>

                        }
                        {showDeleteConfirmation && (
                            <div className="delete-confirmation">
                                <p>Are you sure you want to delete this comment?</p>
                                <button className='delete-yes' onClick={confirmDelete}>Yes</button>
                                <button className='delete-no' onClick={cancelDelete}>No</button>
                            </div>
                        )}

                    </>
                }

            </div>

        </div>
    );
};

export default ForumComment;
