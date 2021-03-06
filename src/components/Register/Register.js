import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="form">
            <div>
                <h2>Create Account</h2>
                <form onSubmit="">
                    <input type="email" name="" placeholder="Your Email"/>
                    <br />
                    <input type="password" name="" placeholder="Password" />
                    <br />
                    <input type="password" name="" placeholder="Re-enter Password" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <div>....................or.....................</div>
                <button className="btn-regular">Google Sign In</button>
            </div>
        </div>
    );
};

export default Register;