import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css'; // Import custom CSS file for styling
import register from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import useNotificationContext from '../../context/NotificationContext';


export const Register = () => {


    const { addNotification } = useNotificationContext();

    const navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        let { email, password, secondPassword } = Object.fromEntries(new FormData(e.currentTarget))

        if (!email || !password || !secondPassword) {
            addNotification('All fields are required!', 'danger')
            return;
        }

        if (password !== secondPassword) {
            addNotification('Password do not match!', 'danger')
            return;
        }

        if (password.length < 8) {
            addNotification('Password must be at least 8 characters long!', 'danger')
            return;
        }


        await register(email, password, addNotification)

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
                        <label style={{'color':'white', 'lineHeight': '20px', 'textAlign': 'center'}}>Password must be at least 8 characters/digits long! </label>
                        <div className="text-center-register">
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
