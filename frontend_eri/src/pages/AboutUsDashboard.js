import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

function AboutUsDashboard() {
  const [content, setContent] = useState({ title: '', description: '', image_url: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/about-us')
      .then(res => {
        if (res.data) setContent(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch About Us content', err);
      });
  }, []);

  const handleChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('http://127.0.0.1:8000/api/about-us', content);
      toast.success('About Us content updated!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || '';
  
      if (errorMessage.includes('Data too long for column') && errorMessage.includes('image_url')) {
        toast.error('Image URL is too long. Please try a different image link.');
      } else if (err.response?.data?.errors?.image_url) {
        toast.error(`Image URL Error: ${err.response.data.errors.image_url[0]}`);
      } else {
        toast.error('Failed to update About Us content');
      }
  
      console.error('Update error:', err.response || err);
    }
    setSaving(false);
  };
  
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">Edit About Us</h1>

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={content.title}
            onChange={e => handleChange('title', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={content.description}
            onChange={e => handleChange('description', e.target.value)}
            rows={8}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            value={content.image_url}
            onChange={e => handleChange('image_url', e.target.value)}
            className="w-full p-2 border rounded"
          />
          {content.image_url && (
            <img
              src={content.image_url}
              alt="About Us Preview"
              className="mt-4 rounded max-w-full"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUsDashboard;
