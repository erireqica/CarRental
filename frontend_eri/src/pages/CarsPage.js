import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';

function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then(setCars);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
            Discover Our Fleet
          </h1>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CarsPage;
