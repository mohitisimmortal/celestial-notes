import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userLoggedInState } from '../../recoil/userAtom';
import { useNavigate } from 'react-router-dom';
import './login.css'
import baseurl from '../../baseurl';

const Login: React.FC = () => {
    const [, setUserLoggedIn] = useRecoilState(userLoggedInState);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseurl}/login`, formData);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                setUserLoggedIn(true); // Update the isLoggedIn state in the Homepage component
                navigate('/')
            }

        } catch (error: any) {
            console.error('Login failed:', error.response.data.error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <section className='login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className='login'>Login</button>
            </form>
        </section>
    );
};

export default Login;