import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css'; // Import custom CSS file for styling
import register from '../../services/authServices';
import { useNavigate } from 'react-router-dom';


export const Register = () => {

    const navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        let { email, password, secondPassword } = Object.fromEntries(new FormData(e.currentTarget))

        if (password !== secondPassword) {
            alert('Passwords do not match!');
            return;
        }


        await register(email, password)

        navigate('/login')
    }

    return (
        <div className='body'>
            <div className="form-container">
                <Form className="my-form" onSubmit={registerSubmitHandler}>
                    <div className='form-fields'>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name='secondPassword' type="password" placeholder="Password" />
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

    );
}

export default Register;
