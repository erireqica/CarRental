import React from 'react';
import Navbar from '../components/Navbar';
import BookingHistory from '../components/BookingHistory';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function BookingHistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <BookingHistory />
        </div>
      </div>
    </>
  );
}

export default BookingHistoryPage; 