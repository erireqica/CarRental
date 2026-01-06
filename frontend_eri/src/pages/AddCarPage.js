import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCarPage() {
  const [form, setForm] = useState({
    name: '',
    brand_id: '',
    vehicle_model_id: '',
    car_type_id: '',
    price_per_day: '',
    available: true,
    image_url: '',
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/brands')
      .then((res) => setBrands(res.data))
      .catch(() => toast.error('❌ Failed to load brands'));

    axios
      .get('/car-types')
      .then((res) => setTypes(res.data))
      .catch(() => toast.error('❌ Failed to load car types'));
  }, []);

  useEffect(() => {
    if (!form.brand_id) {
      setModels([]);
      setForm((f) => ({ ...f, vehicle_model_id: '' }));
      return;
    }

    axios
      .get(`/brands/${form.brand_id}/models`)
      .then((res) => {
        setModels(res.data);
        setForm((f) => ({ ...f, vehicle_model_id: '' })); // reset when brand changes
      })
      .catch(() => toast.error('❌ Failed to load models'));
  }, [form.brand_id]);

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
      await axios.post('/cars', {
        ...form,
        brand_id: form.brand_id ? Number(form.brand_id) : null,
        vehicle_model_id: form.vehicle_model_id ? Number(form.vehicle_model_id) : null,
        car_type_id: form.car_type_id ? Number(form.car_type_id) : null,
      });

      toast.success('✅ Car added successfully!');
      navigate('/admin');
    } catch (err) {
      toast.error('❌ Error adding car');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 flex justify-center">Add a New Car</h1>
          <p className="text-gray-500 mb-6 flex justify-center">Fill in the details below to list a new car.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
           

            {/* Brand dropdown */}
            <select
              name="brand_id"
              value={form.brand_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Model dropdown (locked until brand selected) */}
            <select
              name="vehicle_model_id"
              value={form.vehicle_model_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!form.brand_id}
              required
            >
              <option value="">
                {form.brand_id ? 'Select Model' : 'Select Brand first'}
              </option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            {/* Type dropdown */}
            <select
              name="car_type_id"
              value={form.car_type_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="year"
              value={form.year || ''}
              onChange={handleChange}
              placeholder="Year"
              className="w-full border p-2 rounded"
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
              <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
              <span>Available</span>
            </label>

            {form.image_url && (
              <div className="mb-4 flex justify-center">
                <img
                  src={form.image_url}
                  alt={form.name || 'Preview'}
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
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddCarPage;
