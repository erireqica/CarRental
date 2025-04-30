import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CarCard({ car, canEdit, canManageBookings }) {
  const navigate = useNavigate();
  const { user, setIsLoginModalOpen } = useAuth();

  const handleBook = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    // Implement booking logic here
    alert('Booking functionality to be implemented');
  };

  const handleEdit = () => {
    navigate(`/cars/edit/${car.id}`);
  };

  const handleToggleAvailability = () => {
    // Implement availability toggle logic here
    alert('Availability toggle functionality to be implemented');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={car.image_url ? car.image_url : `https://via.placeholder.com/400x200?text=${car.name}`}
        alt={car.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{car.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Brand: {car.brand}</p>
        <p className="text-sm text-gray-600 mb-1">Type: {car.type}</p>
        <p className="text-lg text-blue-600 font-semibold">${car.price_per_day} / day</p>
        <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
          car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {car.available ? 'Available' : 'Not Available'}
        </span>

        <div className="mt-4 space-y-2">
          {car.available && (
            <button
              onClick={handleBook}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          )}

          {canEdit && (
            <button
              onClick={handleEdit}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              Edit Details
            </button>
          )}

          {canManageBookings && (
            <button
              onClick={handleToggleAvailability}
              className={`w-full py-2 px-4 rounded transition ${
                car.available
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {car.available ? 'Mark as Unavailable' : 'Mark as Available'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarCard;
  