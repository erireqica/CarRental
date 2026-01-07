import React, { useEffect, useMemo, useState } from 'react';
import { getCars } from '../api/cars';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [filters, setFilters] = useState({
    brand_id: '',
    vehicle_model_id: '',
    year_min: '',
    year_max: '',
    price_min: '',
    price_max: '',
    availableOnly: false,
  });

  const [draft, setDraft] = useState(filters);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission, setIsLoginModalOpen } = useAuth();

  const { type } = queryString.parse(location.search);
  const [selectedType, setSelectedType] = useState(type || 'All');

  useEffect(() => {
    getCars()
      .then(setCars)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios.get('/brands').then((res) => setBrands(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setSelectedType(type || 'All');
  }, [type]);

  const getTypeName = (car) =>
    car?.carType?.name || car?.car_type?.name || car?.type || '';

  const types = useMemo(() => {
    const unique = new Set(cars.map((c) => getTypeName(c)).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [cars]);

  const handleTypeChange = (type) => {
    navigate(`?type=${type === 'All' ? '' : type}`);
  };

  const handleManageCars = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (hasPermission('admin')) {
      navigate('/admin');
    } else {
      alert('You do not have permission to manage cars');
    }
  };

  const hasActiveFilters =
    filters.brand_id ||
    filters.vehicle_model_id ||
    filters.year_min ||
    filters.year_max ||
    filters.price_min ||
    filters.price_max ||
    filters.availableOnly; 

  const filteredCars = useMemo(() => {
    const t = selectedType.toLowerCase();

    const bId = filters.brand_id ? Number(filters.brand_id) : null;
    const mId = filters.vehicle_model_id ? Number(filters.vehicle_model_id) : null;

    const yMin = filters.year_min ? Number(filters.year_min) : null;
    const yMax = filters.year_max ? Number(filters.year_max) : null;

    const pMin = filters.price_min ? Number(filters.price_min) : null;
    const pMax = filters.price_max ? Number(filters.price_max) : null;

    return cars.filter((car) => {
      // available only filter
      if (filters.availableOnly && !car.available) return false;

      // type
      const carType = getTypeName(car).toLowerCase();
      if (selectedType !== 'All' && carType !== t) return false;

      // brand/model
      const carBrandId = car.brand_id ?? car.brandRef?.id ?? car.brand_ref?.id ?? null;
      const carModelId =
        car.vehicle_model_id ?? car.vehicleModel?.id ?? car.vehicle_model?.id ?? null;

      if (bId && carBrandId !== bId) return false;
      if (mId && carModelId !== mId) return false;

      // year
      const carYear = Number(car.year);
      if (yMin && carYear < yMin) return false;
      if (yMax && carYear > yMax) return false;

      // price
      const carPrice = Number(car.price_per_day);
      if (pMin && carPrice < pMin) return false;
      if (pMax && carPrice > pMax) return false;

      return true;
    });
  }, [cars, selectedType, filters]);

  const openFilters = async () => {
    setDraft(filters);

    if (filters.brand_id) {
      try {
        const res = await axios.get(`/brands/${filters.brand_id}/models`);
        setModels(res.data);
      } catch {
        setModels([]);
      }
    } else {
      setModels([]);
    }

    setIsFilterOpen(true);
  };

  const closeFilters = () => setIsFilterOpen(false);

  const handleDraftBrandChange = async (brandId) => {
    setDraft((prev) => ({
      ...prev,
      brand_id: brandId,
      vehicle_model_id: '',
    }));

    if (!brandId) {
      setModels([]);
      return;
    }

    try {
      const res = await axios.get(`/brands/${brandId}/models`);
      setModels(res.data);
    } catch {
      setModels([]);
    }
  };

  const applyFilters = () => {
    setFilters(draft);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    const empty = {
      brand_id: '',
      vehicle_model_id: '',
      year_min: '',
      year_max: '',
      price_min: '',
      price_max: '',
      availableOnly: false, 
    };
    setFilters(empty);
    setDraft(empty);
    setModels([]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700">Discover Our Fleet</h1>

            {user && (hasPermission('admin') || hasPermission('super_admin')) && (
              <button
                onClick={handleManageCars}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
              >
                Manage Cars
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              onClick={openFilters}
              className={`relative h-10 w-10 flex items-center justify-center rounded-full border transition ${
                hasActiveFilters
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
              }`}
              title="Filters"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.6a3 3 0 0 1-.9 2.1L14 14.9V20a1 1 0 0 1-1.5.86l-3-1.8A1 1 0 0 1 9 18.2v-3.3L3.9 8.7A3 3 0 0 1 3 6.6V5z" />
              </svg>

              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-lg text-gray-500">Loading cars...</p>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-xl text-gray-600 font-medium">No cars available for this category.</p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  canEdit={hasPermission('super_admin')}
                  canManageBookings={hasPermission('admin')}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeFilters} />

          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-700">Filters</h2>
              <button onClick={closeFilters} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={draft.brand_id}
                  onChange={(e) => handleDraftBrandChange(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">All brands</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select
                  value={draft.vehicle_model_id}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, vehicle_model_id: e.target.value }))
                  }
                  className="w-full border p-2 rounded"
                  disabled={!draft.brand_id}
                >
                  <option value="">{draft.brand_id ? 'All models' : 'Select brand first'}</option>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price min</label>
                <input
                  type="number"
                  min="0"
                  value={draft.price_min}
                  onChange={(e) => setDraft((prev) => ({ ...prev, price_min: e.target.value }))}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price max</label>
                <input
                  type="number"
                  min="0"
                  value={draft.price_max}
                  onChange={(e) => setDraft((prev) => ({ ...prev, price_max: e.target.value }))}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. 80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year min</label>
                <input
                  type="number"
                  min="1980"
                  value={draft.year_min}
                  onChange={(e) => setDraft((prev) => ({ ...prev, year_min: e.target.value }))}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. 2015"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year max</label>
                <input
                  type="number"
                  min="1980"
                  value={draft.year_max}
                  onChange={(e) => setDraft((prev) => ({ ...prev, year_max: e.target.value }))}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. 2024"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                <input
                  id="availableOnly"
                  type="checkbox"
                  checked={!!draft.availableOnly}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, availableOnly: e.target.checked }))
                  }
                  className="h-4 w-4"
                />
                <label htmlFor="availableOnly" className="text-sm text-gray-700">
                  Show only available cars
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={clearFilters}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Clear
              </button>

              <div className="flex gap-2">
                <button
                  onClick={closeFilters}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Filter
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">Select filters and press “Filter” to apply.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CarsPage;
