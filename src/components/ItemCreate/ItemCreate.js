import React, { useState } from 'react';
import './ItemCreate.css'
import PostService from '../../services/postServices';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ItemCreate = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    console.log('show user token', user.token)

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = Object.fromEntries(new FormData(event.target));
    
        let resp = await PostService(data, user.token)
        if (resp){
            
            navigate('/profile')
        }
    };

    return (
        <div className='body'>
            <div className='card'>
                <h2>Add Gym Item</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="gymItem">Gym Item Name:</label>
                    <input
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
                        type="number"
                        id="price"
                        name="price"
                        required
                    />
                    <br />

                    <label htmlFor="image">Image url:</label>
                    <input
                        type="text"
                        id="image"
                        name="image_url"
                        required
                    />
                    <br />

                    <label htmlFor="price">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder='Optional'
                    />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ItemCreate;
