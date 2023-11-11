
import './Login.css';
import { Form, Button } from 'react-bootstrap';

import { loginToServer } from '../../services/authServices';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useNotificationContext from '../../context/NotificationContext';


export const Login = () => {

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const {addNotification} = useNotificationContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { email, password } = Object.fromEntries(new FormData(e.target));

        if (!email || !password) {
            setError("Both email and password are required");
            setLoading(false);
            return;
        }

        try {
            const resp = await loginToServer(email, password)
            console.log('resp', resp)
            if (resp==false) {
                console.log('been here');
                addNotification('Verify your credentials!', 'danger');
                throw new Error('Verify your credentials');
            }

            login(resp);
            addNotification('Logged in successfully!', 'success')
            navigate('/profile');
        }
        catch (err) {
            console.log('goes in heree wee')
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='body'>
            <div className="form-container">
                {error && <p className="error-message">{error}</p>}
                {loading ? (
                    <p className="loading-message" style={{'color':'white'}}>Loading...</p>
                ) : (
                    <Form className="my-form" onSubmit={handleSubmit}>
                        <div className='form-fields'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name='email' type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' type="password" placeholder="Password" />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary" type="submit" className="btn-sm">
                                    Submit
                                </Button>
                                <Link to="/forgot-password" className="btn btn-link-forgot-password">
                                    <p className='forgot-attr'>Forgot Password</p>
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    )

}

export default Login;