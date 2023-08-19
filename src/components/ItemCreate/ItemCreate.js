import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PostService from '../../services/postServices';
import './ItemCreate.css';
import useNotificationContext from '../../context/NotificationContext';


const ItemCreate = () => {

    const { user } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);

    const {addNotification} = useNotificationContext();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);

        if (selectedFile) {
            formData.append('image_file', selectedFile);
        }

        let resp = await PostService(formData, user.token)
        if (resp) {
            addNotification('Item created successfully', 'success')
            navigate('/profile')
        }
    };


    return (
        <div className='bodyy'>
            <div className='cardd'>
                <h2 style={{'color': 'white'}}>Add Gym Item</h2>
                <form className='create-itemm' onSubmit={handleSubmit}>
                    <label htmlFor="gymItem">Gym Item Name:</label>
                    <input
                        type="text"
                        id="gymItem"
                        name="name"
                        required
                    />
                    <br />

                    <label htmlFor="category">Type of Category:</label>

                    {/* <select className='select-category' style={{ 'margin-bottom': '15px', 'display': 'inline-block', 'width': '360px', 'padding': '5px' }} name="category" required> */}
                    <select className='select-category' name="category" required>
                    
                        <option value="">--Select Category--</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility and mobility</option>
                        <option value="boxing">Boxing</option>
                    </select>


                    <br />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        pattern="^\d+(\.\d{0,2})?$"
                        required
                    />
                    <br />

                    <label htmlFor='image-upload'>Upload Image</label>
                    <input
                        // style={{ display: 'none' }}
                        className='local-image'
                        type="file"
                        id='imageUpload'
                        name='image_file'
                        accept='image/*'
                        onChange={(e) => setSelectedFile(
                            e.target.files[0])}
                    />
                    <button
                        type="button"
                        className="uploadButtonn"
                        onClick={() => document.getElementById('imageUpload').click()}
                    >
                        Choose file
                    </button>
                    <br />

                    <label htmlFor="price">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                    />
                    <br />

                    <label htmlFor="Name">Name of Seller</label>
                    <input
                        type="text"
                        id="seller"
                        name="seller"
                        // placeholder='Optional...'
                    />

                    <label htmlFor="Quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        // placeholder='Optional..'
                    />

                    <label htmlFor="Location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        // placeholder='Optional...'
                    />

                    <label htmlFor="Location">Mobile Number</label>
                    <input
                        type="text"
                        id="mobile-number"
                        name="mobile_number"
                        // placeholder='Optional...'
                    />

                    <button className='item-create-submitt' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ItemCreate;
