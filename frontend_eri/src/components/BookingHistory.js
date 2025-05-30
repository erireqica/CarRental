import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/bookings');
            setBookings(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookings');
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await axios.post(`/bookings/${bookingId}/cancel`);
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (err) {
            toast.error('Failed to cancel booking');
        }
    };

    if (!user) {
        return (
            <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700">Please log in to view your bookings.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 text-center">
                <p>Loading your bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            
            {bookings.length === 0 ? (
                <p className="text-gray-600">You haven't made any bookings yet.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{booking.car?.name}</h3>
                                    <p className="text-sm text-gray-600">{booking.car?.brand} - {booking.car?.type}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Start Date</p>
                                    <p className="font-medium">{new Date(booking.start_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">End Date</p>
                                    <p className="font-medium">{new Date(booking.end_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Total Days</p>
                                    <p className="font-medium">
                                        {Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24))} days
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Total Price</p>
                                    <p className="font-medium">${booking.total_price}</p>
                                </div>
                            </div>

                            {booking.status === 'pending' && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}