import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Find Your Perfect Ride with AutoRent</h1>
          <p className="text-lg mb-6">Affordable, reliable, and ready when you are.</p>
          <button
            onClick={() => navigate('/cars')}
            className="bg-white text-blue-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
          >
            Browse Cars
          </button>
        </div>
      </section>

      <section className="pt-14 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            Something for Everyone
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/cars?type=SUV')}
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage:
                  "url('https://www.kbb.com/wp-content/uploads/2024/01/2024-chevrolet-traverse-rs-red-front-left-3qtr.jpg?w=757')",
                  cursor: 'pointer',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  SUVs for Family Adventures
                </span>
              </div>
            </div>

            <div
              onClick={() => navigate('/cars?type=Sedan')}
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage:
                  "url('https://www.usnews.com/object/image/00000190-bd16-dc6b-a395-fd9782870000/2025-honda-civic-sedan-sport-hybrid.jpg?update-time=1721159286933&size=responsive640')",
                  cursor: 'pointer',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  Sedans for City Cruising
                </span>
              </div>
            </div>

            <div
              onClick={() => navigate('/cars?type=Hatchback')}
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage:
                  "url('https://www.vw.com/content/dam/onehub_pkw/importers/us/en/showrooms/golf-gti/2024/golf-gti-380-mood-gallery/VW_NGW6_Showroom_GTI_380_MoodGallery-3.jpg')",
                  cursor: 'pointer',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  Hatchbacks for Everyday Drives
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="pt-16 pb-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">Why Choose AutoRent?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/car--v1.png" alt="Reliable Vehicles" className="mx-auto mb-4 w-12" />
              <h3 className="text-lg font-semibold mb-2">Reliable Vehicles</h3>
              <p className="text-gray-600">We offer top-notch, well-maintained cars for all your needs.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/discount--v1.png" alt="Affordable Rates" className="mx-auto mb-4 w-12" />
              <h3 className="text-lg font-semibold mb-2">Affordable Rates</h3>
              <p className="text-gray-600">Enjoy great deals and competitive pricing on all rentals.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/clock.png" alt="24/7 Availability" className="mx-auto mb-4 w-12" />
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">We are available on your time. Rent whenever it suits you!</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/thumb-up.png" alt="Easy Booking" className="mx-auto mb-4 w-12" />
              <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and fast booking process at your fingertips.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
