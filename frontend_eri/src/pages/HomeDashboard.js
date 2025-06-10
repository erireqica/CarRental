import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';

function HomeDashboard() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/homepage')
      .then(res => setContent(res.data))
      .catch(err => console.error('Failed to fetch homepage content', err));
  }, []);

  const handleChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('http://127.0.0.1:8000/api/homepage', content);
      alert('Homepage content updated!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Update failed');
    }
    setSaving(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-grow bg-gray-100 py-10 px-6 overflow-auto">
          <div className="max-w-6xl mx-auto py-10 px-4 md:px-8">
            <h1 className="text-3xl font-bold mb-10 text-left text-blue-700">Homepage Editor Dashboard</h1>

            {!content ? (
              <div className="text-center text-gray-500 text-lg font-medium py-20">
                Loading homepage content...
              </div>
            ) : (
              <>
                <section className="bg-white border-2 border-gray-300 shadow-xl rounded-lg p-6 mb-12">
                  <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-2">Hero Section</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-1">Hero Title</label>
                      <input value={content.hero_title} onChange={e => handleChange('hero_title', e.target.value)} className="p-2 border rounded w-full" />

                      <label className="block font-medium mt-4 mb-1">Hero Subtitle</label>
                      <input value={content.hero_subtitle} onChange={e => handleChange('hero_subtitle', e.target.value)} className="p-2 border rounded w-full" />

                      <label className="block font-medium mt-4 mb-1">Hero Button Text</label>
                      <input value={content.hero_button_text} onChange={e => handleChange('hero_button_text', e.target.value)} className="p-2 border rounded w-full" />

                      <label className="block font-medium mt-4 mb-1">Hero Background Image URL</label>
                      <input value={content.hero_background_url} onChange={e => handleChange('hero_background_url', e.target.value)} className="p-2 border rounded w-full" />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Background Image Preview</label>
                      <img src={content.hero_background_url} alt="Hero Preview" className="w-full h-48 object-cover rounded border" />
                    </div>
                  </div>
                </section>

                <section className="bg-white shadow-xl border-2 border-gray-300 rounded-lg p-6 mb-12">
                  <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-2">Category Cards</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                        <label className="block font-medium mb-1">Card {i} Title</label>
                        <input value={content[`card${i}_title`]} onChange={e => handleChange(`card${i}_title`, e.target.value)} className="p-2 border rounded w-full" />

                        <label className="block font-medium mt-4 mb-1">Card {i} Image URL</label>
                        <input value={content[`card${i}_image`]} onChange={e => handleChange(`card${i}_image`, e.target.value)} className="p-2 border rounded w-full" />

                        <label className="block font-medium mt-4 mb-1">Card {i} Redirect Type</label>
                        <input value={content[`card${i}_type`] || ''} onChange={e => handleChange(`card${i}_type`, e.target.value)} className="p-2 border rounded w-full" />

                        <img src={content[`card${i}_image`]} alt={`Card ${i}`} className="w-full h-40 object-cover mt-3 rounded border" />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white shadow-xl border-2 border-gray-300 rounded-lg p-6 mb-12">
                  <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-2">Why Choose Us</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[4, 5, 6, 7].map((i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                        <label className="block font-medium mb-1">Card {i} Title</label>
                        <input value={content[`card${i}_title`]} onChange={e => handleChange(`card${i}_title`, e.target.value)} className="p-2 border rounded w-full" />

                        <label className="block font-medium mt-4 mb-1">Card {i} Description</label>
                        <input value={content[`card${i}_description`]} onChange={e => handleChange(`card${i}_description`, e.target.value)} className="p-2 border rounded w-full" />

                        <label className="block font-medium mt-4 mb-1">Card {i} Icon/Image URL</label>
                        <input value={content[`card${i}_image`]} onChange={e => handleChange(`card${i}_image`, e.target.value)} className="p-2 border rounded w-full" />

                        <img src={content[`card${i}_image`]} alt={`Card ${i}`} className="w-16 h-16 object-contain mx-auto mt-3 rounded border" />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="text-center">
                  <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-8 py-2 rounded shadow hover:bg-blue-700 transition">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default HomeDashboard;
