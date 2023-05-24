import './Profile.css'
import { getSingleItem } from '../../services/getServices';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';


export const Profile = () => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const { user } = useAuth();

    let [items, setItem] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    // for setting the profile data
    const [profile, setProfile] = useState({
        name: '',
        location: '',
        hobby: ''

    });


    const [refreshProfile, setRefreshProfile] = useState(false);


    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    const [formInputs, setFormInputs] = useState({});

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

        }
        getProfile();
    }, [refreshProfile])

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    let token = user.token;

    // handle edit profile picture
    const formRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsEditFormVisible(false);
            }
        }

        if (isEditFormVisible) {
            // Add the event listener when the form is visible
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove the event listener when the form is hidden
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditFormVisible]); // Depend on isEditFormVisible so it re-runs when this value changes



    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in formInputs) {
            formData.append(key, formInputs[key]);
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
                alert('Profile updated successfully');
                setRefreshProfile(current => !current);

            } else {
                // Handle error response
                console.log(response.message);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error:', error);
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
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
                alert('Item deleted successfully');
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

    console.log('show me the profile image', profile.image)

    return (

        <section class="card-container" ref={cardContainerRef}>
            <div class="header">

                <div className="profile-content">
                    {
                        profile
                            ?
                            <>
                                {
                                    profile.image
                                        ?
                                        <>
                                            <img
                                                className='profile-image'
                                                src={`${BASE_URL}/upload_profile_images/${profile.image}`}
                                                alt="profile"
                                            />
                                            <p>Name: {profile.name}</p>
                                            <p>Location: {profile.location}</p>
                                            <p>Hobby: {profile.hobby}</p>
                                        </>
                                        :
                                        <>
                                            <img src={profile.name} />
                                            <p>Name: {profile.name}</p>
                                            <p>Location: {profile.location}</p>
                                            <p>Hobby: {profile.hobby}</p>
                                        </>
                                }
                            </>
                            :
                            <p>No Profile info yet</p>
                    }

                    <button style={{ 'backgroundColor': 'white', 'width': '55px', 'color': 'black' }} onClick={() => setIsEditFormVisible(true)}>Edit</button>
                </div>


                {isEditFormVisible && (
                    <form ref={formRef} className="edit-form" onSubmit={handleFormSubmit}>
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
            <div class="main2">
                <div className='container-headings'>
                    <h3>My Items</h3>
                    <p style={{ 'margin-top': '40px' }} className="heading-p">View and edit your items</p>
                </div>
                <div class="card-info">
                    {
                        items.length === 0 ? (
                            <div className="no-items">
                                <p className='no-items-p' >You have no items</p>
                                <Link className='no-items-add-link' to="/upload-item">Add an gym item</Link>
                            </div>
                        ) : (
                            items.map((item) =>
                                <div class="items">
                                    <img src={`${BASE_URL}/upload_profile_images/${item.image_url_path}`} />

                                    <p>Name: {item.name}</p>
                                    <span >Price: {item.price}£</span>

                                    < Link className='edit-profile-btn' to={`/edit-item/${item.item_id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <Link>
                                        <button className='dlt-profile-btn' onClick={() => handleDelete(item.item_id)}>Delete</button>
                                    </Link>

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

