import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './ForumDetail.css'
import ForumCommentsList from "./ForumCommentsList";

export const ForumDetail = () => {
    const [forum, setForum] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [hoovered, setHoovered] = useState(false);

    // This will be in ForumDetail.js
    const [refreshKey, setRefreshKey] = useState(0);


    const getForumTitleDetail = async () => {
        try {
            const response = await fetch(`http://localhost:5000/forum-data/${id}`, {
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
            const response = await fetch(`http://localhost:5000/get_forum_messages/${id}`, {
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
        const request = await fetch(`http://localhost:5000/save-comment/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: data,
            })
        })

        if (request.status === 201){
            const dataResp = await request.json();
            console.log(dataResp);
            setRefreshKey(prevKey => prevKey + 1);
        }

    }


    return (
            loading ? <div className="loading-forums-state">Loading...</div>
                :
                <div className="forum-detail-main">
                    <div className="forum-detail-section">
                        <div className="span-detail-section">
                            <h1>Title {forum.title}</h1>
                            <p className="description-comments">Description: {forum.description}</p>
                        </div>

                    </div>
                    <div className="comments">
                        <h2>Comments</h2>
                        <ForumCommentsList comments={comments} setRefreshKey={setRefreshKey} id={id} />

                        <div className="add-comment" onMouseEnter={() => setHoovered(true)} onMouseLeave={() => setHoovered(false)}>
                            <label className="add-comment-label">Add Comment</label>
                            {hoovered &&
                                <form onSubmit={handleSubmittedData} className="add-comment-form">
                                    <textarea
                                        name="comment"
                                        className="add-comment-textarea"
                                    // value={commentText}
                                    // onChange={(e) => setCommentText(e.target.value)} // we update commentText whenever the user types in the textarea
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
