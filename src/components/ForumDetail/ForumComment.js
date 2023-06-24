import React, { useState, useRef, useEffect } from 'react';
import './ForumComment.css';
import { useAuth } from '../../context/AuthContext';

const ForumComment = ({ content, forum_id }) => {
    const { user } = useAuth();
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emojiReactions, setEmojiReactions] = useState({}); // A map that stores emoji -> array of usernames

    const [isHovered, setIsHovered] = useState(false);



    const emojiPickerRef = useRef();
    const emojis = ["👍", "😅", "🤣", "🥲", "😭", "😕", "😎"];

    const fetchUsernames = async (userIds) => {
        try {
            const response = await fetch('http://localhost:5000/get-usernames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(userIds),
            });

            if (response.ok) {
                const data = await response.json();
                return data; // This will be an object mapping user IDs to usernames
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
            const response = await fetch(`http://localhost:5000/get-emoji/${forum_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userReaction = data.find(reaction => String(reaction.user_id) === String(user._id));
                // Update selectedEmoji only if userReaction is found
                console.log('show me the selected emoji', userReaction);
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
            const response = await fetch('http://localhost:5000/save-emoji', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    emoji,
                    forum_id,
                }),
            });

            if (response.ok) {
                console.log('Reaction saved to server successfully');
                // setSelectedEmoji(emoji); // Update selectedEmoji state here
                fetchReactions(); // Fetch reactions again after saving
            } else {
                console.error('Failed to save reaction:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEmojiClick = (emoji) => {
        setShowEmojis(false);
        saveReaction(emoji);
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
    }, [forum_id, selectedEmoji]);



    return (

        <div className="main-comments-section">
            <p className="forum-content">{content}</p>


            <div>
                <button
                    className={`emoji-picker ${selectedEmoji ? 'emoji-selected' : ''}`}
                    onClick={() => setShowEmojis(!showEmojis)}
                >
                    Like
                </button>
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

            <div className='like-comment'>
                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className='comment-picker'>
                    Comment
                </button>

                {isHovered && (
                    <div className="comment-section">
                        <form >
                            <textarea
                                name='comment'
                                className="input-textarea"
                            // value={newComment}
                            // onChange={e => setNewComment(e.target.value)}
                            />
                            <button style={{ 'margin': 'auto', 'display': 'block' }} >Submit</button>
                        </form>
                    </div>
                )}
            </div>

            <div>
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
        </div>



    );
};

export default ForumComment;
