import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';

function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then(setCars);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Available Cars</h1>
        <ul className="space-y-2">
          {cars.map(car => (
            <li key={car.id} className="border p-4 rounded shadow-sm">
              <strong>{car.name}</strong> — {car.brand} — ${car.price_per_day}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CarsPage;
