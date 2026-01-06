import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingForm from './BookingForm';

function CarCard({ car }) {
  const navigate = useNavigate();
  const { user, setIsLoginModalOpen } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBook = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    setShowBookingForm(true);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
  };

  const brandName = car.brandRef?.name || car.brand_ref?.name || car.brand || '';
  const modelName = car.vehicleModel?.name || car.vehicle_model?.name || '';
  const typeName = car.carType?.name || car.car_type?.name || car.type || '';
  const yearValue = car.year ?? '';

  const title = brandName && modelName ? `${brandName} ${modelName}` : (car.name || brandName || 'Car');

  const placeholderText = encodeURIComponent(title);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={car.image_url ? car.image_url : `https://via.placeholder.com/400x200?text=${placeholderText}`}
        alt={title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{title}</h2>

        <p className="text-sm text-gray-600 mb-1">Type: {typeName}</p>
        {yearValue && <p className="text-sm text-gray-600 mb-1">Year: {yearValue}</p>}

        <p className="text-lg text-blue-600 font-semibold">${car.price_per_day} / day</p>

        <span
          className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
            car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {car.available ? 'Available' : 'Not Available'}
        </span>

        <div className="mt-4 space-y-2">
          {!showBookingForm ? (
            <button
              onClick={car.available ? handleBook : undefined}
              disabled={!car.available}
              className={`w-full py-2 px-4 rounded transition
                ${
                  car.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Book Now
            </button>
          ) : (
            <BookingForm car={car} onBookingComplete={handleBookingComplete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CarCard;
