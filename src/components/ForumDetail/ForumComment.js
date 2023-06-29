import React, { useState, useRef, useEffect } from 'react';
import './ForumComment.css';
import { useAuth } from '../../context/AuthContext';

const ForumComment = ({ content, forum_id, id, setRefreshKey }) => {
    const { user } = useAuth();
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emojiReactions, setEmojiReactions] = useState({});

    const [reactionId, setReactionId] = useState(null);

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
            const response = await fetch(`http://localhost:5000/get-emoji/${fetchId}`, {
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
            const response = await fetch('http://localhost:5000/save-emoji', {
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

    const handleEmojiClick = async (emoji) => {
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
        setRefreshKey(prevKey => prevKey + 1);
    }, [forum_id, reactionId, user]);

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

            {/* <div className='like-comment'>
                {isHovered && (
                    <div className="comment-section">
                        <form >
                            <textarea
                                name='comment'
                                className="input-textarea"
                            />
                            <button style={{ 'margin': 'auto', 'display': 'block' }} >Submit</button>
                        </form>
                    </div>
                )}
            </div> */}

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
