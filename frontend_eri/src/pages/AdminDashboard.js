import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/cars')
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await axios.delete(`/cars/${id}`);
      setCars(cars.filter((car) => car.id !== id));
      toast.success('Car deleted successfully');
    } catch {
      toast.error('Failed to delete car');
    }
  };

  const getVehicleLabel = (car) => {
    const brand = car?.brandRef?.name || car?.brand || '';
    const model = car?.vehicleModel?.name || '';
    return `${brand}${model ? ` ${model}` : ''}`.trim();
  };

  const getTypeLabel = (car) => {
    return car?.carType?.name || car?.type || '';
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-grow bg-gray-100 py-10 px-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-blue-700">Manage Cars</h1>
              <button
                onClick={() => navigate('/cars/add')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Car
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-60">
                <p className="text-xl text-gray-500 font-medium">Loading cars...</p>
              </div>
            ) : (
            <div>
              <div className="overflow-x-auto">
                <div className="max-h-[300px] overflow-y-auto rounded-lg shadow">
                  <table className="min-w-full w-full table-fixed bg-white">
                    <thead className="sticky top-0 z-10 bg-gray-100 text-left">
                      <tr>
                        <th className="py-3 px-4 w-[26%]">Vehicle</th>
                        <th className="py-3 px-4 w-[18%]">Type</th>
                        <th className="py-3 px-4 w-[10%]">Year</th>
                        <th className="py-3 px-4 w-[14%]">Price</th>
                        <th className="py-3 px-4 w-[12%]">Available</th>
                        <th className="py-3 px-4 w-[20%]">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cars.length > 0 ? (
                        cars.map((car) => (
                          <tr key={car.id} className="border-t">
                            <td className="py-2 px-4 truncate">{getVehicleLabel(car)}</td>
                            <td className="py-2 px-4 truncate">{getTypeLabel(car)}</td>
                            <td className="py-2 px-4">{car.year ?? '-'}</td>
                            <td className="py-2 px-4">${car.price_per_day}</td>
                            <td className="py-2 px-4">{car.available ? '✅' : '❌'}</td>
                            <td className="py-2 px-4 space-x-2">
                              <button
                                onClick={() => navigate(`/edit/${car.id}`)}
                                className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(car.id)}
                                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-10 text-xl text-gray-500 font-medium">
                            No cars found. Add a new car to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              

                <div className="mt-12">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-4">Preview</h2>
                  {cars.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-xl text-gray-500 font-medium">
                        No cars are currently available. Please check back later.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;
