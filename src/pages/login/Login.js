import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SEO from '../../utils/SEO';
import { setAuth } from '../../store/slice/authSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        // Mock login (replace with real API)
        const token = 'mock-token-123';
        const user = { name: 'John Doe', email: 'john@example.com' };

        dispatch(setAuth({ token, user }));
        navigate('/profile');
    };

    return (
        <>
            <SEO
                title="Login - AirwayClear"
                description="Sign in to your AirwayClear account to access your orders, profile settings, and more."
                keywords="AirwayClear login, sign in, user access"
                ogTitle="Login to AirwayClear"
                ogDescription="Access your dashboard and order information."
                twitterTitle="Login - AirwayClear"
                twitterDescription="Enter your credentials to sign in."
            />
            <div>
                <h1>Login</h1>
                <button onClick={handleLogin}>Login Now</button>
            </div>
        </>
    );
}
