import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutUsStatic() {
  return (
    <>
      <Navbar />

      <section
        className="relative bg-blue-900 text-white py-28 px-6 text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg font-light leading-relaxed">
            Founded in 2010, AutoRent has grown from a small local rental service to a trusted brand nationwide. Our passion for mobility drives everything we do.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Who We Are</h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed mb-6">
          AutoRent was born out of a simple idea — to make transportation accessible, affordable, and hassle-free. Over the years, we've expanded our fleet, improved our technology, and focused on exceptional customer service. Our team is dedicated to helping you get where you need to be with confidence and comfort.
        </p>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed">
          Headquartered in the heart of the city, we now serve thousands of customers every year and continue to innovate in the car rental industry.
        </p>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-800">Our Journey</h2>
          <ol className="relative border-l-2 border-blue-600 max-w-4xl mx-auto space-y-10">
            {[
              { year: '2010', event: 'Founded with 20 cars and a vision.' },
              { year: '2013', event: 'Expanded fleet to 100 vehicles.' },
              { year: '2016', event: 'Launched online booking platform.' },
              { year: '2020', event: 'Reached 1 million rentals milestone.' },
              { year: '2024', event: 'Introduced electric and hybrid cars.' },
            ].map(({ year, event }) => (
              <li key={year} className="relative pl-8">
                <span className="absolute left-[-20px] top-1 text-blue-600 font-bold text-xl">{year}</span>
                <p className="text-lg text-gray-700">{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-800">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { name: 'Alice Johnson', role: 'CEO', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Mark Davis', role: 'CTO', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
              { name: 'Sara Lee', role: 'Customer Support', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
            ].map(({ name, role, image }) => (
              <div key={name} className="bg-white rounded-lg p-6 shadow text-left">
                <img src={image} alt={name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-gray-600">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutUsStatic;
