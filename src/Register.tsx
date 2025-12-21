import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ParticlesCanvas from './assets/components/ParticlesCanvas';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Registration data:', formData);
      // Here you would typically make an API call to register the user
      
      // For demo purposes, redirect to login after successful registration
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden">
      <ParticlesCanvas />
      
      {/* Background shapes (similar to login page) */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute bottom-1/4 left-[32%] w-[120%] h-[120%] bg-[#1957A4] rounded-[50%] rotate-[53deg] opacity-100" />
          <div className="absolute bottom-1/4 left-[34%] w-[120%] h-[120%] bg-[#1D9B4C] rounded-[50%] rotate-[53deg] opacity-80" />
        </div>
      </div>

      {/* Left side - Form container */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative z-10">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-28">
                
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join our CRM platform to manage your business efficiently
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mobile Number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Company Name (Optional) */}
            <div>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Name (Optional)"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1d9b4c] text-white py-3 rounded-lg font-semibold hover:bg-[#189749] transition-colors mt-4"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image/Content */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 relative z-0">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Grow Your Business</h2>
            <p className="text-gray-600 mt-2">
              Join thousands of businesses using our CRM to streamline operations, 
              manage customers, and boost productivity.
            </p>
            <ul className="mt-4 text-left text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Manage unlimited customers
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Track sales and leads
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Automated reporting
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Mobile-friendly interface
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;