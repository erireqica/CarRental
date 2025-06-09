import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AboutUs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/about-us')
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setContent(res.data);
        } else {
          setError('No About Us content found.');
        }
      })
      .catch(err => {
        setError('Failed to load About Us content.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20">Loading About Us...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  const {
    title = 'Our Story',
    description = '',
    image_url = '',

    journey_1_year,
    journey_1_event,
    journey_2_year,
    journey_2_event,
    journey_3_year,
    journey_3_event,

    team_1_name,
    team_1_role,
    team_1_image,
    team_2_name,
    team_2_role,
    team_2_image,
    team_3_name,
    team_3_role,
    team_3_image,
  } = content;

  return (
    <>
      <Navbar />

      

      <section
        className="relative bg-blue-900 text-white py-28 px-6 text-center"
        style={{ backgroundImage: image_url ? `url('${image_url}')` : "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >

        {(user && (hasPermission('admin') || hasPermission('super_admin'))) && (
          <button
            onClick={() => navigate('/dashboard/about-us')}
            className="absolute top-6 right-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition z-20"
          >
            Edit About Us
          </button>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg font-light leading-relaxed">
            {description.split('\n')[0] || 'Founded in 2010, AutoRent has grown from a small local rental service to a trusted brand nationwide.'}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Who We Are</h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed whitespace-pre-line">{description}</p>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-800">Our Journey</h2>
          <ol className="relative border-l-2 border-blue-400 max-w-4xl mx-auto space-y-10">
            {[ 
              { year: journey_1_year, event: journey_1_event }, 
              { year: journey_2_year, event: journey_2_event }, 
              { year: journey_3_year, event: journey_3_event }
            ].map(({ year, event }, i) => (
              year && event && (
                <li key={i} className="relative pl-8">
                  <span className="absolute left-[-20px] top-1 text-blue-600 font-bold text-xl">{year}</span>
                  <p className="text-lg text-gray-700">{event}</p>
                </li>
              )
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-800">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[ 
              { name: team_1_name, role: team_1_role, image: team_1_image },
              { name: team_2_name, role: team_2_role, image: team_2_image },
              { name: team_3_name, role: team_3_role, image: team_3_image },
            ].map(({ name, role, image }, i) => (
              name && role && image && (
                <div key={i} className="bg-white rounded-lg p-6 shadow text-left">
                  <img src={image} alt={name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-semibold mb-1">{name}</h3>
                  <p className="text-gray-600">{role}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;
