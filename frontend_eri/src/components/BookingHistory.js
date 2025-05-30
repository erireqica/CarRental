import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(res => setBookings(res.data));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Booking History</h2>
            <ul className="space-y-2">
                {bookings.map(booking => (
                    <li key={booking.id} className="p-2 border rounded shadow">
                        Car ID: {booking.car_id}, Date: {booking.booking_date}
                    </li>
                ))}
            </ul>
        </div>
    );
}