import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from '../context/AuthContext';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission, setIsLoginModalOpen } = useAuth();

  const { type } = queryString.parse(location.search);
  const [selectedType, setSelectedType] = useState(type || 'All');

  useEffect(() => {
    getCars()
      .then(setCars)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectedType(type || 'All');
  }, [type]);

  const filteredCars =
    selectedType === 'All'
      ? cars
      : cars.filter((car) => car.type.toLowerCase() === selectedType.toLowerCase());

  const types = ['All', ...new Set(cars.map((car) => car.type))];

  const handleFilterChange = (type) => {
    navigate(`?type=${type === 'All' ? '' : type}`);
  };

  const handleManageCars = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (hasPermission('admin')) {
      navigate('/admin');
    } else {
      alert('You do not have permission to manage cars');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700">
              Discover Our Fleet
            </h1>
            {user && (hasPermission('admin') || hasPermission('super_admin')) && (
              <button
                onClick={handleManageCars}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
              >
                Manage Cars
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-lg text-gray-500">Loading cars...</p>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-xl text-gray-600 font-medium">
                No cars available for this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  canEdit={hasPermission('super_admin')}
                  canManageBookings={hasPermission('admin')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CarsPage;
