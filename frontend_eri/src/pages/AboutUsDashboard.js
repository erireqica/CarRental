import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

function AboutUsDashboard() {
  const [content, setContent] = useState(null); // changed initial value to null
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/about-us')
      .then(res => res.data && setContent(res.data))
      .catch(() => toast.error('Failed to load About Us content'));
  }, []);

  const handleChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('http://127.0.0.1:8000/api/about-us', content);
      toast.success('About Us content updated!');
    } catch {
      toast.error('Failed to update About Us content');
    }
    setSaving(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-grow bg-gray-100 py-10 px-6 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-blue-700">Edit About Us</h1>

            {!content ? (
              <div className="text-center text-gray-500 text-lg font-medium py-20">
                Loading About Us content...
              </div>
            ) : (
              <>
                <label className="block font-semibold">Title</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={e => handleChange('title', e.target.value)}
                  className="w-full p-2 border rounded"
                />

                <label className="block font-semibold">Description</label>
                <textarea
                  rows={5}
                  value={content.description}
                  onChange={e => handleChange('description', e.target.value)}
                  className="w-full p-2 border rounded"
                />

                <label className="block font-semibold">Image URL</label>
                <input
                  type="text"
                  value={content.image_url}
                  onChange={e => handleChange('image_url', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {content.image_url && (
                  <img
                    src={content.image_url}
                    alt="Main Banner Preview"
                    className="mt-2 max-h-40 object-contain rounded"
                  />
                )}

                <h2 className="text-xl font-semibold mt-6">Our Journey</h2>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="Year"
                      value={content[`journey_${i}_year`]}
                      onChange={e => handleChange(`journey_${i}_year`, e.target.value)}
                      className="p-2 border rounded w-24"
                    />
                    <input
                      type="text"
                      placeholder="Event"
                      value={content[`journey_${i}_event`]}
                      onChange={e => handleChange(`journey_${i}_event`, e.target.value)}
                      className="p-2 border rounded flex-grow"
                    />
                  </div>
                ))}

                <h2 className="text-xl font-semibold mt-6">Meet The Team</h2>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col gap-2 mb-6">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Name"
                        value={content[`team_${i}_name`]}
                        onChange={e => handleChange(`team_${i}_name`, e.target.value)}
                        className="p-2 border rounded w-48"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={content[`team_${i}_role`]}
                        onChange={e => handleChange(`team_${i}_role`, e.target.value)}
                        className="p-2 border rounded w-48"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={content[`team_${i}_image`]}
                        onChange={e => handleChange(`team_${i}_image`, e.target.value)}
                        className="p-2 border rounded flex-grow"
                      />
                    </div>
                    {content[`team_${i}_image`] && (
                      <img
                        src={content[`team_${i}_image`]}
                        alt={`Team member ${i} preview`}
                        className="max-h-32 object-contain rounded"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition"
                  >
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

export default AboutUsDashboard;
