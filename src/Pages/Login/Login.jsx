import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser()
    }

    const loginUser = () => {
        // You can add your login logic here using axios
        axios.post('/user/login', {
            email: email,
            password: pass
        })
            .then(function (response) {
                if (response.data.userType != "User") {
                    console.log("Can't Login")

                }
                else {
                    console.log(response.data);

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn">Don't have an account? Register here.</button>
        </div>
    );
}

export default Login;
