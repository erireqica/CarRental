import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';


function EditCarPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    type: '',
    price_per_day: '',
    available: true,
    image_url: '',
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cars/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/cars/${id}`, form);
      toast.success('Car updated successfully!');
      navigate('/admin');
    } catch (err) {
      toast.error('Failed to update car');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 flex justify-center">Edit Car</h1>
          <p className="text-gray-500 mb-6 flex justify-center">Update the car details below and save your changes.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Type"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price_per_day"
              value={form.price_per_day}
              onChange={handleChange}
              placeholder="Price Per Day"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-2 rounded"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />
              <span>Available</span>
            </label>

            {form.image_url && (
              <div className="mb-4 flex justify-center">
                <img
                  src={form.image_url}
                  alt={form.name}
                  className="w-80 h-40 object-cover rounded-md border shadow-sm"
                />
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update Car
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditCarPage;
