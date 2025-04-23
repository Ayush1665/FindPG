import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [authState, setAuthState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAuthState = () => {
    setAuthState(prev => prev === 'Sign Up' ? 'Login' : 'Sign Up');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      axios.defaults.withCredentials = true;
      const url = `${backendUrl}/api/auth/${authState === 'Sign Up' ? 'register' : 'login'}`;
      const payload = authState === 'Sign Up' ? formData : { 
        email: formData.email, 
        password: formData.password 
      };

      const { data } = await axios.post(url, payload);
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        navigate('/');
        toast.success(`Welcome ${authState === 'Sign Up' ? formData.name : ` back!`}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <div className="absolute top-6 left-6 sm:left-12 cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src={assets.logo} 
          alt="logo" 
          className="w-16 sm:w-20 transition-transform hover:scale-105" 
        />
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">
              {authState === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400">
              {authState === 'Sign Up' 
                ? 'Join us today!' 
                : 'Log in to continue your journey'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {authState === 'Sign Up' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src={assets.person_icon} alt="user" className="h-5 w-5 opacity-70 filter brightness-0 invert" />
                </div>
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  type="text"
                  placeholder="Full Name"
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={assets.mail_icon} alt="email" className="h-5 w-5 opacity-70 filter brightness-0 invert" />
              </div>
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                type="email"
                placeholder="Email Address"
                required
                autoComplete="username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={assets.lock_icon} alt="lock" className="h-5 w-5 opacity-70 filter brightness-0 invert" />
              </div>
              <input
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                type="password"
                placeholder="Password"
                required
                autoComplete={authState === 'Sign Up' ? 'new-password' : 'current-password'}
                minLength="6"
              />
            </div>

            {authState === 'Login' && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => navigate('/reset-password')}
                  className="text-indigo-400 hover:text-indigo-300 text-sm underline transition"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-medium transition flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                authState
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {authState === 'Sign Up' 
                ? 'Already have an account?'
                : "Don't have an account?"}
              {' '}
              <button 
                type="button"
                onClick={toggleAuthState}
                className="text-indigo-400 font-medium underline hover:text-indigo-300 transition"
              >
                {authState === 'Sign Up' ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;