import './Profile.css'
import { getSingleItem } from '../../services/getServices';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useNotificationContext from '../../context/NotificationContext';


export const Profile = () => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const { user } = useAuth();

    const [loading, setIsLoading] = useState(true);

    const [loadingProfileInfo, setIsLoadingProfileInfo] = useState(true);

    let [items, setItem] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [refreshProfile, setRefreshProfile] = useState(false);

    const { addNotification } = useNotificationContext();

    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    const [formInputs, setFormInputs] = useState({
        name: '',
        location: '',
        hobby: '',
        image: ''
    });

    const [profile, setProfile] = useState({
        image: '',
        name: '',
        location: '',
        hobby: ''
    });

    useEffect(() => {
        const getProfile = async () => {
            const data = await fetch(`${BASE_URL}/profile-image`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            })
            const profileres = await data.json();
            setProfile(profileres);
            setIsLoadingProfileInfo(false);

        }
        getProfile();
    }, [refreshProfile])

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    let token = user.token;

    // handle profile picture
    const formRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsEditFormVisible(false);
            }
        }

        if (isEditFormVisible) {
            setFormInputs({
                name: profile.name || '',
                location: profile.location || '',
                hobby: profile.hobby || '',
                image: ''
            });

            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove the event listener when the form is hidden
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditFormVisible, profile]); // Depend on isEditFormVisible so it re-runs when this value changes

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in formInputs) {
            formData.append(key, formInputs[key] || '');
        }

        formData.append("image_file", selectedFile);

        try {
            const response = await fetch(`${BASE_URL}/profile-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

                body: formData, // Use the FormData instance as the request body
            });


            if (response.status === 201) {
                // add notification success
                addNotification('Profile updated successfully', 'success');
                setRefreshProfile(current => !current);

            } else {
                console.log(response.message);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error:', error);
        }

        setIsEditFormVisible(false);
    };

    const handleInputChange = (e) => {

        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    };

    const cardContainerRef = useRef(null);

    useEffect(() => {
        getSingleItem(token)
            .then(
                (response) => {
                    if (response) {
                        setItem(response)
                        setIsLoading(false);
                    }
                }
            )
    }, [])

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            // Call the API to delete the item
            const response = await fetch(`${BASE_URL}/item-detail/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                // Remove the item from the items state
                setItem(items => items.filter(item => item.item_id !== itemId));
                addNotification('Item deleted successfully', 'success');
            } else {
                // Handle error here
                console.log(data.message);
            }
        }
    };

    if (items.length === 1) {
        cardContainerRef.current.style.height = 'auto';
    } else {

    }

    const editFormClassName = `edit-form ${profile.image ? 'user-has-picture-form' : 'user-no-picture-form'}`;
    const editFormContainerClassName = `main2 ${profile.image ? 'visible' : 'hidden'}`;


    return (

        <section class="card-container" ref={cardContainerRef}>
            <div class="header-profile">
                {
                    loadingProfileInfo ?
                        <p className='profile-loading-heading'>Loading...</p>
                        :
                        <div className="profile-content">
                            {
                                profile ?
                                    <>
                                        {
                                            profile.image || profile.name || profile.location || profile.hobby ?
                                                <>
                                                    <div className='profile-info-side user-has-picture'>
                                                        <h2 className='profile-information-heading'>Profile Information: </h2>
                                                        <img className='profile-image' alt='No Image' src={profile.image} />
                                                        <p>Name: {profile.name}</p>
                                                        <p>Location: {profile.location}</p>
                                                        <p>Hobby: {profile.hobby}</p>
                                                        <button style={{ 'backgroundColor': 'white', 'width': '55px', 'color': 'black', 'cursor': 'pointer' }} onClick={() => setIsEditFormVisible(true)}>Edit</button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='new-user-info user-has-picture'>
                                                        <h1 className="notification-popup">Do you want to put a profile Information?
                                                            <button className='personal-information-button-we' onClick={() => setIsEditFormVisible(true)}>Click here</button>
                                                        </h1>
                                                    </div>
                                                </>
                                        }
                                    </>
                                    :
                                    <p>No Profile info yet</p>
                            }
                        </div>
                }

                {isEditFormVisible && (
                    <form ref={formRef} className={editFormClassName} onSubmit={handleFormSubmit}>
                        <label for="fileInput">
                            Upload image
                            <input type="file"

                                id="fileInput"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </label>
                        <input type="text" name="name" placeholder="Name" value={formInputs.name} onChange={handleInputChange} />
                        <input type="text" name="location" placeholder="Location" value={formInputs.location} onChange={handleInputChange} />
                        <input type="text" name="hobby" placeholder="Hobby" value={formInputs.hobby} onChange={handleInputChange} />
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>

            <div class={editFormContainerClassName}>
                <div className='container-headings'>
                    <h3 className='profile-my-items'>My Items</h3>
                    <p style={{ 'margin-top': '24px' }} className="heading-p">View and edit your items</p>
                </div>
                <div class="card-info">
                    {
                        loading ?
                            <p className='profile-loading'>Loading...</p>
                            :
                            items.length === 0 ? (
                                <div style={{ 'margin': 'auto', textAlign: 'center', 'verticalAlign': 'middle' }} className="no-items">
                                    <p className='no-items-p' >You have no items</p>
                                    <Link className='no-items-add-link' to="/upload-item">Add an gym item</Link>
                                </div>
                            ) : (
                                items.map((item) =>
                                    <div class="items">
                                        <img src={`${item.image_url_path}`} className='items-image' alt="Item Image" />
                                        <div className='profile-name-price-wrapper'>
                                            <p className='item-name-profile'>Name: {item.name}</p>
                                            <span>Price: {item.price}£</span>
                                        </div>
                                        <div class="edit-delete">
                                            <Link className='edit-profile-btn' to={`/edit-item/${item.item_id}`}>
                                                <button>Edit</button>
                                            </Link>
                                            <Link>
                                                <button className='dlt-profile-btn' onClick={() => handleDelete(item.item_id)}>Delete</button>
                                            </Link>
                                        </div>

                                    </div>


                                )
                            )
                    }


                </div>
            </div>
        </section>

    )
}


export default Profile;

