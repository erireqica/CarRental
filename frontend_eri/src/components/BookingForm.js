import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function BookingForm({ car, onBookingComplete }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/bookings', {
                car_id: car.id,
                start_date: startDate,
                end_date: endDate
            });

            if (onBookingComplete) {
                onBookingComplete(response.data.booking);
            }

            // Reset form
            setStartDate('');
            setEndDate('');
            alert('Booking request submitted successfully! Waiting for admin confirmation.');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700">Please log in to book a car.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Book this car</h3>
            
            {error && (
                <div className="mb-4 p-2 bg-red-50 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                {startDate && endDate && (
                    <div className="text-sm text-gray-600">
                        <p>Total days: {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))}</p>
                        <p>Total price: ${(Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) * car.price_per_day).toFixed(2)}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                        loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Processing...' : 'Book Now'}
                </button>
            </div>
        </form>
    );
}
