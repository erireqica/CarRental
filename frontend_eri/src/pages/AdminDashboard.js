import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import BookingManagement from '../components/BookingManagement';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'bookings'
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();

  useEffect(() => {
    if (!user || !hasPermission('admin')) {
      navigate('/');
      return;
    }
    fetchCars();
  }, [user, navigate]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/cars');
      setCars(response.data);
    } catch (error) {
      toast.error('Failed to fetch cars');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await axios.delete(`/cars/${id}`);
      toast.success('Car deleted successfully');
      fetchCars();
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };

  if (!user || !hasPermission('admin')) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700">Admin Dashboard</h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/cars/add')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add New Car
              </button>
              {hasPermission('super_admin') && (
                <button
                  onClick={() => navigate('/users')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Manage Users
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('cars')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cars'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cars
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bookings
              </button>
            </nav>
          </div>

          {/* Content */}
          {activeTab === 'cars' ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-100 text-left w-full table">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Available</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="block max-h-[300px] overflow-y-auto w-full">
                  {cars.length > 0 ? (
                    cars.map((car) => (
                      <tr key={car.id} className="table w-full table-fixed border-t">
                        <td className="py-2 px-4">{car.name}</td>
                        <td className="py-2 px-4">{car.brand}</td>
                        <td className="py-2 px-4">{car.type}</td>
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
                      <td colSpan="6" className="py-4 text-center text-gray-500">
                        No cars found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <BookingManagement />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
