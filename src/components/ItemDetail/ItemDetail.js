import './ItemDetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSingleItemDashboard } from '../../services/getServices';
import StarRating from './StarRating';
import useNotificationContext from '../../context/NotificationContext';
import CommentItem from './CommentItem';
import Spinner from '../Spinner/Spinner';

export const ItemDetails = () => {


  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { addNotification } = useNotificationContext();

  const [isLoading, setIsLoading] = useState(true);

  const { itemId } = useParams();
  const [product, setProduct] = useState([]);
  const { user } = useAuth();

  const token = user.token
  const userId = user._id

  let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

  const [showComments, setShowComments] = useState(false);
  const [writeComments, setWriteComments] = useState(false);
  const [comments, setComments] = useState({ comments: [] });
  const [currentComment, setCurrentComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-comments/${itemId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentEdited = () => {
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);


  const handleCommentSubmit = async () => {
    if (currentComment.trim()) {

      const response = await fetch(`${BASE_URL}/save-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemId: itemId,
          comment: currentComment,
        })
      });


      if (response.ok) {
        const newComment = await response.json();
        addNotification('Comment added successfully', 'success');
        setCurrentComment("");
        handleCommentEdited();

        setWriteComments(false);
      } else {
        // Handle error.
        console.error("Failed to submit comment");
      }
    }
  };


  // 
  useEffect(() => {
    setIsLoading(true);
    
    const fetchProduct = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${BASE_URL}/item-detail/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false); // End loading, no matter if there was an error or not
      }
  };
  

    fetchProduct();

  }, [itemId])

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-ratings/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAverageRating(data.average_rating);
        setTotalRatings(data.total_ratings);
        setUserRating(data.user_rating);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      }
    }

    fetchRatings();
  }, [itemId, averageRating, totalRatings, userRating]);


  let [imageurlpath, setImageurlpath] = useState('')

  useEffect(() => {
    getSingleItemDashboard(itemId).then((result) => {
      setImageurlpath(result.image_url_path)
    })
  }, [itemId]);

  const handleRating = async (rating) => {

    try {
      const response = await fetch(`${BASE_URL}/save-rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemId: itemId,
          rating: rating,
          userId: user.id
        })
      });
      if (response.status === 200 || response.status === 201) {

        // Update averageRating and totalRatings with the data received from the server
        const responseData = await response.json();
        setAverageRating(responseData.average_rating);
        setTotalRatings(responseData.total_ratings);

        setUserRating(responseData.user_rating);
      } else if (response.status === 204) {
        addNotification('Rating deleted successfully', 'danger');
        setAverageRating(0);
        setTotalRatings(0);
        setUserRating(0);
        throw new Error('Rating deleted successfully');
      }
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  }

  return (
    <div className='card-details'>
      {
        isLoading
          ?
          <Spinner />
          :
          <>
            <div className="product-view">
              <div className='product-info-top'>
                <div>
                  <h1 className='product-name-card-details'>{product.name}</h1>
                </div>
              </div>

              <div className='product-main'>
                <div className='product-img'>
                  <img className='product-img-picture' src={`${imageurlpath}`} />
                </div>

                <div className='product-main-info'>

                  <div className='price-wrapper'>

                    <div className='price-wrapper-details'>
                      <ul>
                        <li>
                          <span className='price-title'>List Price:</span>
                          <span className='price'>£ {product.price}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="review-start">
                      <StarRating
                        totalStars={5}
                        onRate={handleRating}
                        filledStars={averageRating}
                        userRating={userRating}
                      />
                      <p style={{ 'margin-top': '6px' }} className='total-reviews'> Total Reviews: {totalRatings}</p>


                    </div>

                  </div>

                  <div className='card-text'>
                    <p className='card-text-p-element'>
                      Description: {product.description}
                    </p>
                    {/* <div>
                <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Buy</a></button>
              </div> */}
                    {/* <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Edit</a></button>
              <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Delete</a></button> */}
                  </div>
                </div>
              </div>
            </div >

            <div className='product-information'>
              <h2 className='card-details-product-information'>Seller Information</h2>
              <div className='attributes-container'>
                <ul>
                  <li>
                    <span className='product-detail-user-info'>Name: {product.seller} </span>

                  </li>

                </ul>
                <ul>
                  <li>
                    <span>Quantity: {product.quantity} </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Location: {product.location} </span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <span>Mobile Number: {product.mobile_number} </span>
                  </li>
                </ul>

              </div>
            </div>

            <div className="comments-wrapper">
              <div className='comments-info-item-detail'>
                <button className="toggle-comments-btn" onClick={() => setShowComments(!showComments)}>
                  {showComments ? "Hide Comments" : "Show Comments"} ({comments.comments?.length || 0})
                </button>
                <button className='toggle-comments-btn' onClick={() => setWriteComments(!writeComments)} >
                  {writeComments ? "Cancel Writing Comments" : "Write Comments"}
                </button>
              </div>


              {writeComments && (
                <div className="comments-section">

                  <textarea
                    className="comment-input"
                    value={currentComment}
                    onChange={(e) => { console.log(e.target.value); setCurrentComment(e.target.value) }}
                    placeholder="Write your comment here..."
                  />

                  <button className="submit-comment-btn" onClick={handleCommentSubmit}>Submit Comment</button>


                </div>
              )}
              {showComments && (
                <div className='comments-wrapper-detail'>
                  <ul className="comments-list">
                    {comments.comments.map((comment, idx) => (
                      <CommentItem key={idx}
                        comment={comment.comment}
                        commentId={comment.comment_id}
                        itemId={itemId}
                        token={token}
                        userId={userId}
                        commentUserId={comment.user_id}
                        editSuccess={handleCommentEdited}
                      />
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </>
      }


    </div>
  );
};

export default ItemDetails;
