function CarCard({ car }) {
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
        </div>
      </div>
    );
  }
  
  
  export default CarCard;
  