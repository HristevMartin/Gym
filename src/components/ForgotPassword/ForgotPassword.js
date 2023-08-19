
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import useNotificationContext from '../../context/NotificationContext';


export const ForgotPassword = () => {
    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    let navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const {addNotification} = useNotificationContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { email } = Object.fromEntries(new FormData(e.target));

        if (!email) {
            addNotification('Please enter an email', 'danger')
            setLoading(false);
            return;
        }

        try {
            console.log(`BASE_URL is: ${BASE_URL}`);
            let request = await fetch(`${BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (request.status === 404) {
                throw new Error('Email does not exist');
            }

            const data = await request.json();


            if (request.ok) {
                setMessage(data.message);

                setTimeout(function () {
                    navigate('/login');
                }, 5000);
            } else {
                setError(data.message);
            }


        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='forgot-password-div'>
            <Form className='forgot-password' onSubmit={handleSubmit}>
                <Form.Group className='form-forgot-password' controlId="formBasicEmail">
                    <Form.Label className='email'>Email address</Form.Label>
                    <Form.Control className='big-input' name='email' type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit" className='big-button' disabled={loading}>
                    {loading ? 'Loading...' :
                        <p style={{'margin-right': '50px'}}> Send password reset email</p>}
                        
                </Button>
            </Form>
            {error && <p style={{ 'color': 'white' }} className='error-message'>{error}</p>}
            {message && <p style={{ 'color': 'white', 'lineHeight': '10px' }} className="success-message">{message}</p>}
        </div>
    )
}


export default ForgotPassword;