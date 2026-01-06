import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: '',
    price_per_day: '',
    available: true,
    image_url: '',
    brand_id: '',
    vehicle_model_id: '',
    car_type_id: '',
  });

  const [brands, setBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const fetchModels = async (brandId) => {
    if (!brandId) {
      setModels([]);
      return;
    }
    setLoadingModels(true);
    try {
      const res = await axios.get(`/brands/${brandId}/models`);
      setModels(res.data);
    } finally {
      setLoadingModels(false);
    }
  };

  useEffect(() => {
    axios.get('/brands').then((res) => setBrands(res.data)).catch(console.error);
    axios.get('/car-types').then((res) => setCarTypes(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    axios
      .get(`/cars/${id}`)
      .then((res) => {
        const c = res.data;

        setForm({
          year: c.year ?? '',
          price_per_day: c.price_per_day ?? '',
          available: c.available ?? true,
          image_url: c.image_url ?? '',
          brand_id: c.brand_id ?? '',
          vehicle_model_id: c.vehicle_model_id ?? '',
          car_type_id: c.car_type_id ?? '',
        });

        if (c.brand_id) fetchModels(c.brand_id);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load car');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBrandChange = async (e) => {
    const brandId = e.target.value;

    setForm((prev) => ({
      ...prev,
      brand_id: brandId,
      vehicle_model_id: '', 
    }));

    await fetchModels(brandId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      year: form.year === '' ? null : Number(form.year),
      price_per_day: form.price_per_day === '' ? null : Number(form.price_per_day),
      available: !!form.available,
      image_url: form.image_url?.trim() ? form.image_url.trim() : null,

      brand_id: form.brand_id === '' ? null : Number(form.brand_id),
      vehicle_model_id: form.vehicle_model_id === '' ? null : Number(form.vehicle_model_id),
      car_type_id: form.car_type_id === '' ? null : Number(form.car_type_id),
    };

    try {
      await axios.put(`/cars/${id}`, payload);
      toast.success('Car updated successfully!');
      navigate('/admin');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors ? 'Validation failed' : 'Failed to update car');
      toast.error(msg);
      console.error(err);
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
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year (e.g. 2020)"
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

            <select
              name="brand_id"
              value={form.brand_id}
              onChange={handleBrandChange}
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

            <select
              name="vehicle_model_id"
              value={form.vehicle_model_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!form.brand_id || loadingModels}
              required
            >
              <option value="">
                {!form.brand_id ? 'Select brand first' : loadingModels ? 'Loading models...' : 'Select Model'}
              </option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <select
              name="car_type_id"
              value={form.car_type_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Type</option>
              {carTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-2 rounded"
            />

            <label className="flex items-center space-x-2">
              <input type="checkbox" name="available" checked={!!form.available} onChange={handleChange} />
              <span>Available</span>
            </label>

            {form.image_url && (
              <div className="mb-4 flex justify-center">
                <img
                  src={form.image_url}
                  alt="Car"
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
