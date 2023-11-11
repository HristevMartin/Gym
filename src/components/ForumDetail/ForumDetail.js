import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './ForumDetail.css'
import ForumCommentsList from "./ForumCommentsList";
import { Spinner } from "../Spinner/Spinner";

export const ForumDetail = () => {
    const [forum, setForum] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [hoovered, setHoovered] = useState(false);

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://gym-pro-website.herokuapp.com";

    // This will be in ForumDetail.js
    const [refreshKey, setRefreshKey] = useState(0);


    const getForumTitleDetail = async () => {
        try {
            const response = await fetch(`${BASE_URL}/forum-data/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setForum(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getCommentData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/get_forum_messages/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getForumTitleDetail();
            await getCommentData();
            setLoading(false);
        };

        fetchData();
    }, [id, user.token, refreshKey]);

    let handleSubmittedData = async (e) => {
        e.preventDefault();
        console.log('submitted data', e.target.comment.value)

        const data = e.target.comment.value
        const request = await fetch(`${BASE_URL}/save-comment/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: data,
            })
        })

        if (request.status === 201) {
            const dataResp = await request.json();
            console.log(dataResp);
            setRefreshKey(prevKey => prevKey + 1);
            setHoovered(false);
        }
    }

    return (
        loading ? <div className="loading-forums-statee"><Spinner /></div>
            :
            <div className="forum-detail-main">
                <div className="forum-detail-section">
                    <div className="span-detail-section">
                    <h1 className="forum-title">{forum.title}</h1>

                        <p className="item-detail-description">Description</p>
                        <p  className="description-comments">{forum.description}</p>
                    </div>

                </div>



                <div className="comments">
                    <h2 className="forum-comments-section">Comments</h2>
                    <ForumCommentsList comments={comments} setRefreshKey={setRefreshKey} id={id} userId = {user._id} />

                    <div className="add-comment" onMouseEnter={() => setHoovered(true)} onMouseLeave={() => setHoovered(false)}>
                        <label className="add-comment-label">Add Comment</label>
                        {hoovered &&
                            <form onSubmit={handleSubmittedData} className="add-comment-form">
                                <textarea
                                    name="comment"
                                    className="add-comment-textarea"
                                />
                                <button className="submit-comment-button">Submit</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
    );
};

export default ForumDetail;
