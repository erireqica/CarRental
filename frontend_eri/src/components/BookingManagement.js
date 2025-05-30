import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, hasPermission } = useAuth();

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
        fetchBookings();
    }, []);

    const handleConfirm = async (bookingId) => {
        try {
            await axios.post(`/bookings/${bookingId}/confirm`);
            toast.success('Booking confirmed successfully');
            fetchBookings();
        } catch (err) {
            toast.error('Failed to confirm booking');
        }
    };

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

    if (!user || !hasPermission('admin')) {
        return (
            <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700">You don't have permission to view this page.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 text-center">
                <p>Loading bookings...</p>
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
            <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
            
            {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Car</th>
                                <th className="py-3 px-4 text-left">Start Date</th>
                                <th className="py-3 px-4 text-left">End Date</th>
                                <th className="py-3 px-4 text-left">Total Price</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-t">
                                    <td className="py-2 px-4">{booking.user?.name || 'N/A'}</td>
                                    <td className="py-2 px-4">{booking.car?.name || 'N/A'}</td>
                                    <td className="py-2 px-4">{new Date(booking.start_date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{new Date(booking.end_date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">${booking.total_price}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        {booking.status === 'pending' && (
                                            <button
                                                onClick={() => handleConfirm(booking.id)}
                                                className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {booking.status !== 'cancelled' && (
                                            <button
                                                onClick={() => handleCancel(booking.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 