import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faComments, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';  // Importing additional icons
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import useNotificationContext from '../../context/NotificationContext';


export const ForumTopics = ({
    id, views, likes, comments, title, user_id, description, onTopicDeleted
}) => {

    let BASE_URL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://gym-pro-website.herokuapp.com";

    const { addNotification } = useNotificationContext();

    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);

    const [topicTitle, setTopicTitle] = useState(title);
    const [topicDescription, setTopicDescription] = useState(description);

    const [isDeleting, setIsDeleting] = useState(false);

    const editForumTopic = async (e) => {
        e.preventDefault();

        const { title, description } = e.target.elements;

        const request = await fetch(`${BASE_URL}/forum-data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value
            })



        });

        if (request.status === 200) {
            setIsEditing(false);
            setTopicTitle(title.value);
            setTopicDescription(description.value);
            addNotification('edited successfully', 'success')
        }
    };

    const handleDeleteConfirm = async () => {
        const request = await fetch(`${BASE_URL}/forum-data/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (request.status === 200) {
            addNotification('Deleted successfully', 'success');
            if (onTopicDeleted){
                onTopicDeleted(id);
            }
        } else {
            addNotification('Error while deleting', 'error');
        }

        setIsDeleting(false);  // Close the confirmation modal regardless of the result.
    };


    return (
        <div className='main-forum-topic-cards'>
            <div className='main-forum-cards'>
                <Link to={`/forum/${id}`}>
                    <h1 className='title-main'>Topic: {topicTitle} <button className="view-discussion-button">View Discussion</button></h1>
                    <p className='title-main description'>Description: {topicDescription}</p>
                </Link>
            </div>


        
            {user && user._id === user_id && (  // Checking if the user exists and if the user's ID matches the post's user_id
                <div className="edit-delete-buttons">
                    <button onClick={() => setIsEditing(!isEditing)} className="edit-button"><FontAwesomeIcon icon={faEdit} /> Edit</button>
                    <button onClick={() => setIsDeleting(!isDeleting)} className="delete-button"><FontAwesomeIcon icon={faTrash} /> Delete</button>

                    {isEditing && (
                        <div className="edit-form-forum">
                            <form onSubmit={editForumTopic}>
                                <label>Title</label>
                                <input name='title' type="text" defaultValue={topicTitle} />
                                <label>Description</label>
                                <input name='description' type="text" defaultValue={topicDescription} />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    )}

                    {isDeleting && (
                        <div className='edit-form-delete'>
                            <h1>Are you sure you want to delete this topic?</h1>
                            <button onClick={handleDeleteConfirm}>Yes</button>
                            <button onClick={() => setIsDeleting(false)}>No</button>
                        </div>
                    )}

                </div>
            )}

            <div className='main-forum-labels'>
                <span><FontAwesomeIcon icon={faEye} />{' '} {views}</span>
                <span><FontAwesomeIcon icon={faThumbsUp} /> {likes}</span>
                <span className='last-span'><FontAwesomeIcon icon={faComments} />{comments}</span>
            </div>
        </div>
    )
}

export default ForumTopics;
