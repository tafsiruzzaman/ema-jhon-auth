import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import "./Login.css";

const Login = () => {
    const { sighInUsingGoogle, setError, setUser, setIsLoading } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';

    const handleGoogleLogin = () => {
        sighInUsingGoogle()
        .then(result => {
            history.push(redirect_uri);
            setUser(result.user);
        })
        .catch(error => {
            setError(error.message);
        })
        .finally(() => setIsLoading(false));
    };

    return (
        <div className="form">
            <div>
                <h2>Login</h2>
                <form>
                    <input type="email" name="" placeholder="Your Email"/>
                    <br />
                    <input type="password" name="" placeholder="Password"/>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>New to ema-jhon <Link to="/register">Create Account</Link></p>
                <div>....................or.....................</div>
                <button onClick={handleGoogleLogin} className="btn-regular">Google Sign In</button>
            </div>
        </div>
    );
};

export default Login;