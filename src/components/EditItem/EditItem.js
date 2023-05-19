import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const EditItem = () => {

    const { itemId } = useParams();
    const { user } = useAuth();

    const [gymItem, setGymItem] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        description: '',
    });

    let navigate = useNavigate();

    const token = user.token;

    useEffect(() => {
        const fetchGymItem = async () => {
            const request = await fetch(`http://127.0.0.1:5000/item-detail/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const response = await request.json();
            setGymItem(response);
        }

        fetchGymItem();
    }, [itemId, token])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setGymItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/item-detail/${itemId}`, {
            method: 'Put',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gymItem)
        });
        const data = await response.json();
        if (data.success) {
            setGymItem(data.gymItem);
            alert('Item updated successfully')
            navigate('/profile');
        }
        else {
            console.log(data.message);
        }
    };

    return (
        <div className='body'>
            <div className='card'>
                <h2>Edit Gym Item</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Gym Item Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={gymItem.name}
                        required
                    />
                    <br />

                    <label htmlFor="gymCategory">Gym Category:</label>
                    <select className='select-category' style={{ 'margin-bottom': '15px', 'display': 'inline-block', 'width': '360px', 'padding': '5px' }}
                        id="category"
                        name="category"
                        value={gymItem.category}
                        onChange={handleChange}
                        required>
                        <option value="">--Select Category--</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="boxing">Boxing</option>
                    </select>
                    <br />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        value={gymItem.price}
                        required
                    />
                    <br />

                    <label htmlFor="image">Image url:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        value={gymItem.image_url}
                        required
                    />
                    <br />

                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        name="description"
                        placeholder="Optional"
                        onChange={handleChange}
                        value={gymItem.description}
                    />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditItem;
