import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const EditItem = () => {

    let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const { itemId } = useParams();
    const { user } = useAuth();

    const [gymItem, setGymItem] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        description: '',
    });

    const [image, setImage] = useState(null);

    let navigate = useNavigate();

    const token = user.token;

    useEffect(() => {
        const fetchGymItem = async () => {
            const request = await fetch(`${BASE_URL}/item-detail/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const response = await request.json();

            console.log('show me the response', response)
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

        let formData = new FormData();
        
        for (let key in gymItem){
            formData.append(key, gymItem[key])
        }



        if (image) {
            formData.append('image_file', image);
        }

        console.log('show me the image', formData.get('image_url_path'))

        const response = await fetch(`${BASE_URL}/item-detail/${itemId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
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

    console.log('show me the gym item', gymItem)

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

                    <label htmlFor='image-upload'>Upload Image</label>

                    <input
                        style={{ display: 'none' }}
                        className='local-image'
                        type="file"
                        id='imageUpload'
                        name='image_file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                        type="button"
                        className="uploadButton"
                        onClick={() => document.getElementById('imageUpload').click()}
                    >
                        Choose file
                    </button>
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
