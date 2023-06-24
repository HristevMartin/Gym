import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PostService from '../../services/postServices';
import './ItemCreate.css';


const ItemCreate = () => {

    const { user } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);

        if (selectedFile){
            formData.append('image_file', selectedFile);
        }

        let resp = await PostService(formData, user.token)
        if (resp) {
            navigate('/profile')
        }
    };


    return (
        <div className='body'>
            <div className='card'>
                <h2>Add Gym Item</h2>
                <form className='create-item' onSubmit={handleSubmit}>
                    <label htmlFor="gymItem">Gym Item Name:</label>
                    <input
                        placeholder='Gym Item Name...'
                        type="text"
                        id="gymItem"
                        name="name"
                        required
                    />
                    <br />

                    <label htmlFor="category">Type of Category:</label>

                    <select className='select-category' style={{ 'margin-bottom': '15px', 'display': 'inline-block', 'width': '360px', 'padding': '5px' }} name="category" required>
                        <option value="">--Select Category--</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility and mobility</option>
                        <option value="boxing">Boxing</option>
                    </select>


                    <br />

                    <label htmlFor="price">Price:</label>
                    <input
                        placeholder='price of item'
                        type="number"
                        id="price"
                        name="price"
                        required
                    />
                    <br />

                    <label htmlFor='image-upload'>Upload Image</label>

                    <input
                        style={{ display: 'none' }}
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
                        className="uploadButton"
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
                        placeholder='Description about your item...'
                    />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ItemCreate;
