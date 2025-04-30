import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Mock users data - same as in UserManagementPage
const mockUsers = [
  { id: 1, email: 'super@admin.com', password: 'admin123', role: 'super_admin' },
  { id: 2, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 3, email: 'user@example.com', password: 'user123', role: 'user' },
];

const LoginModal = () => {
  const { login, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      login({
        id: user.id,
        email: user.email,
        role: user.role
      });
    } else {
      setError('Invalid email or password');
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p>Demo accounts:</p>
          <ul className="mt-2 space-y-1">
            <li>Super Admin: super@admin.com / admin123</li>
            <li>Admin: admin@example.com / admin123</li>
            <li>User: user@example.com / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 