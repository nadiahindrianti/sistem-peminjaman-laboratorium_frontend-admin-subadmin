import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { LuEyeOff, LuEye } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Buttonn from '../components/Atom/button/button.jsx';
import logo from '../assets/logo_lab.png';
import '../styles/formLogin.css';
import axios from 'axios';
import { useAuth } from '../components/Layout/AuthContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true at the beginning of the login process

        const data = {
            email: email,
            password: password
        };

        axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/login', data)
            .then(result => {
                if (result.status === 200) {
                    const authToken = result.data.data.token;
                    login(authToken);
                    console.log(result.data);
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                console.error('Error during login:', error.response?.data?.message || error.message);
                setError(error.response?.data?.message || 'An error occurred. Please try again.');
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    return (
        <div className="mx-auto d-flex" style={{ width: '1350px', height: '700px', padding: '32px', background: '#C1C1C1' }}>
            <div className="d-flex justify-content-center" style={{ marginLeft: '450px', marginTop: '20px', width: '375px', height: '580px', background: '#FFFF', borderRadius: '10px' }}>
                <div className="d-flex flex-column align-items-center">
                    <img src={logo} alt="" style={{ width: '127px', height: '125px', marginTop: '20px' }} />
                    <h3 className="fw-bold mt-4">Welcome to CentrumLab!</h3>
                    <p>Login to your account</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form style={{ width: '100%' }} className="mt-4" onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail" className="mb-4">
                            <div className="input-with-icon">
                                <HiOutlineMail className="input-icon" />
                                <Form.Control
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <div className="password-input-wrapper input-with-icon">
                                <HiOutlineLockClosed className="input-icon" />
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                        </Form.Group>
                        <div className='d-flex justify-content-center mt-5'>
                            <Buttonn className="bg-button px-5" label="Login" type="submit"></Buttonn>
                        </div>
                    </Form>
                    <p style={{ fontSize: '24px', marginTop: '15px', marginBottom: '15px' }}>don't have an account yet?</p>
                    <a href="/rolepage" style={{ border: '#FFFF', marginTop: '-0px', color: "#7CBEFC" }} className="learnmore-btn justify-content-center">Register </a>
                </div>
            </div>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-popup">
                        <p>Mohon tunggu sebentar, proses loading sedang berjalan...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

