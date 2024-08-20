import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { LuEyeOff, LuEye } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Buttonn from '../components/Atom/button/button.jsx';
import logo from '../assets/logo_lab.png';
import '../styles/formLogin.css';
import '../styles/register.css';
import axios from 'axios';
import { Form, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../components/Layout/AuthContext.jsx';

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        nim_nip: '',
        kartu_identitas_url: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [registering, setRegistering] = useState(false); // State untuk loading pendaftaran
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        if (file.size > 20485760) { 
            setError('File size exceeds the limit of 20MB.');
            return;
        }

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const response = await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/public/cloudinary/file-upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const fileUrl = response.data.data.url;
            setFormData(prevState => ({
                ...prevState,
                kartu_identitas_url: fileUrl
            }));
            setUploading(false);
            setError('');
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.response ? err.response.data.message : 'Failed to register.');
        } finally {
            setRegistering(false); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        if (!formData.kartu_identitas_url) {
            await handleFileUpload();
        }

        // Check if file upload was successful
        if (!formData.kartu_identitas_url) {
            setError('Failed to upload identity card. Please try again.');
            return;
        }

        setRegistering(true); // Set loading state to true

        try {
            console.log("Submitting the following data:", formData);
            const response = await axios.post('https://sistem-peminjaman-centrumlab.onrender.com/api/v1/register/admin', {
                full_name: formData.full_name,
                nim_nip: formData.nim_nip,
                kartu_identitas_url: formData.kartu_identitas_url,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });

            console.log('Registration successful:', response.data);
            navigate('/');
            setError('');
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.response ? err.response.data.message : 'Failed to register.');
        } finally {
            setRegistering(false); 
        }
    };

    return (
        <div className="mx-auto d-flex" style={{ width: '1350px', height: '1150px', padding: '32px', background: '#C1C1C1' }}>
            <div className="d-flex justify-content-center" style={{ marginLeft: '450px', marginTop: '50px', width: '375px', height: '1050px', background: '#FFFF', borderRadius: '10px' }}>
                <div className="d-flex flex-column align-items-center">
                    <img src={logo} alt="Logo" style={{ width: '127px', height: '124px', marginTop: '20px' }} />
                    <h3 className="fw-bold mt-4">Welcome to CentrumLab!</h3>
                    <p>Register Now</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form style={{ width: '100%' }} className="mt-4" onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicFullname" className="mb-4">
                            <label className="form-label" htmlFor="full_name">Full Name</label>
                            <div className="input-with-icon">
                                <BsPeople className="input-icon" />
                                <Form.Control
                                    type="text"
                                    name="full_name"
                                    placeholder="Full Name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicNIM" className="mb-4">
                            <label className="form-label" htmlFor="nim_nip">NIP</label>
                            <div className="input-with-icon">
                                <BsPeople className="input-icon" />
                                <Form.Control
                                    type="text"
                                    name="nim_nip"
                                    placeholder="NIM"
                                    value={formData.nim_nip}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicKTM" className="mb-4">
                            <div className="input-file-wrapper">
                                <label className="form-label" htmlFor="uploadFile">Kartu Identitas</label>
                                <input type="file" onChange={handleFileChange} id="uploadFile" />
                                <button type="button" onClick={handleFileUpload} disabled={uploading}>
                                    {uploading ? 'Mohon menunggu, sedang proses uploading...' : 'Upload File'}
                                </button>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mb-4">
                            <label className="form-label" htmlFor="emailaddress">Email Address</label>
                            <div className="input-with-icon">
                                <HiOutlineMail className="input-icon" />
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-4">
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="password-input-wrapper input-with-icon">
                                <HiOutlineLockClosed className="input-icon" />
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword" className="mb-4">
                            <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                            <div className="password-input-wrapper input-with-icon">
                                <HiOutlineLockClosed className="input-icon" />
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                        </Form.Group>
                        <div className='d-flex justify-content-center mt-5'>
                            <Button className="bg-button px-1" type="submit" disabled={uploading || registering}>
                                {registering ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            {(uploading || registering) && (
                <div className="loading-overlay">
                    <div className="loading-popup">
                        <p>Mohon tunggu sebentar, proses loading sedang berjalan...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
