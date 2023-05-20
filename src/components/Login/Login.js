
import './Login.css';
import { Form, Button } from 'react-bootstrap';

import { loginToServer } from '../../services/authServices';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    // const { login } = useAuthContext();  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));
        try {
            const resp = await loginToServer(email, password)

            if (!resp) {
                throw new Error('Verify your credentials');
            }


            console.log('in the login module show me the resp', resp)
            login(resp);
            navigate('/equipment');
        }
        catch (err) {
            console.log('into the error')
            console.log(err);
        }

    }


    return (
        <div className='body'>
            <div className="form-container"> {/* Add a container div for centering */}
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
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;