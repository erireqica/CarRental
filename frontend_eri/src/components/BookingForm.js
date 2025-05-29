import { useState } from 'react';
import axios from '../api/axios';

export default function BookingForm() {
    const [carId, setCarId] = useState('');
    const [date, setDate] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/bookings', { car_id: carId, booking_date: date });
        alert('Booking successful');
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <input type="number" placeholder="Car ID" value={carId} onChange={e => setCarId(e.target.value)} className="input input-bordered w-full mb-2" />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input input-bordered w-full mb-2" />
            <button type="submit" className="btn btn-primary w-full">Book Car</button>
        </form>
    );
}
