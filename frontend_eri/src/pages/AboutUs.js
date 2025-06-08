import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading About Us...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <>
      <Navbar />

      {/* Admin Edit Button */}
      {(user && hasPermission('admin')) && (
        <div className="max-w-6xl mx-auto px-6 mt-4 text-right">
          <button
            onClick={() => navigate('/dashboard/about-us')}
            className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition"
          >
            Edit About Us
          </button>
        </div>
      )}

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 text-center">{content.title}</h1>
        {content.image_url && (
          <img src={content.image_url} alt="About us" className="mx-auto mb-6 rounded" />
        )}
        <p className="text-lg text-gray-700 max-w-4xl mx-auto whitespace-pre-line">{content.description}</p>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;
