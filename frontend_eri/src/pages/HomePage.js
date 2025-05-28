import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

function HomePage() {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/homepage')
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch homepage content:', err);
      });
  }, []);

  if (!content) {
    return <div className="text-center mt-20">Loading homepage content...</div>;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: `url('${content.hero_background_url}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Edit button top-right */}
        {(user && (hasPermission('admin') || hasPermission('super_admin'))) && (
          <button
            onClick={() => navigate('/dashboard/homepage')}
            className="absolute top-6 right-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition z-20"
          >
            Edit Homepage
          </button>
        )}

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl font-extrabold mb-4">{content.hero_title}</h1>
          <p className="text-lg mb-6">{content.hero_subtitle}</p>
          <button
            onClick={() => navigate('/cars')}
            className="bg-white text-blue-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
          >
            {content.hero_button_text}
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-14 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            {content.section1_title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                onClick={() => navigate(`/cars?type=${content[`card${num}_type`]}`)}
                className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url('${content[`card${num}_image`]}')`,
                  cursor: 'pointer',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    {content[`card${num}_title`]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section (card4–card7) */}
      <section className="pt-16 pb-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">Why Choose AutoRent?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[4, 5, 6, 7].map((num) => (
              <div key={num} className="bg-white p-6 rounded shadow">
                <img
                  src={content[`card${num}_image`]}
                  alt={content[`card${num}_title`]}
                  className="mx-auto mb-4 w-12 h-12 object-contain"
                />
                <h3 className="text-lg font-semibold mb-2">{content[`card${num}_title`]}</h3>
                <p className="text-gray-600">{content[`card${num}_description`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
