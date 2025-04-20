import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCars().then(setCars);
  }, []);

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

          {cars.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-xl text-gray-600 font-medium">
                No cars are currently available. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cars.map((car) => (
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
