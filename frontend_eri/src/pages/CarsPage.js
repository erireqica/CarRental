import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { type } = queryString.parse(location.search);

  const [selectedType, setSelectedType] = useState(type || 'All');

  useEffect(() => {
    getCars().then(setCars);
  }, []);

  useEffect(() => {
    setSelectedType(type || 'All');
  }, [type]);

  // Filtering logic
  const filteredCars =
    selectedType === 'All'
      ? cars
      : cars.filter((car) => car.type.toLowerCase() === selectedType.toLowerCase());

  const types = ['All', ...new Set(cars.map((car) => car.type))];

  const handleFilterChange = (type) => {
    navigate(`?type=${type === 'All' ? '' : type}`);
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
            <button
              onClick={() => navigate('/admin')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
            >
              Manage Cars
            </button>
          </div>

          {/* Filter Buttons */}
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

          {filteredCars.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-xl text-gray-600 font-medium">
                No cars available for this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CarsPage;