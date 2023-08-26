import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/userAtom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import baseurl from '../../baseurl';

const Signup: React.FC = () => {
  const [, setUser] = useRecoilState(userState);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(`${baseurl}/signup`, formData);
    // Update Recoil user state
    setUser(response.data.user);
    navigate('/login')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className='signup'>
      <h2>Signup</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Form fields */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Signup;