import React, { useEffect, useState } from 'react';
import { getCars } from '../api/cars'; 

function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then(setCars);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-3xl font-bold text-blue-600">Available Cars</h1>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.name} - {car.brand} - ${car.price_per_day}
          </li>

        ))}
      </ul>
    </div>
  );
}

export default CarsPage;
